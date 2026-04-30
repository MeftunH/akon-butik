import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import type { DiaClient } from '@akonbutik/dia-client';
import type { Job } from 'bullmq';

import { PrismaService } from '../../prisma/prisma.service';
import { DIA_CLIENT } from '../../dia/dia.module';

export const DIA_PUSH_ORDER_QUEUE = 'dia-push-order';

interface PushJob {
  orderId: string;
}

@Processor(DIA_PUSH_ORDER_QUEUE, {
  concurrency: 1, // single DIA user constraint
})
export class DiaPushOrderProcessor extends WorkerHost {
  private readonly logger = new Logger(DiaPushOrderProcessor.name);

  constructor(
    @Inject(DIA_CLIENT) private readonly dia: DiaClient,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  override async process(job: Job<PushJob>): Promise<{ diaSiparisKodu: string | null }> {
    const order = await this.prisma.order.findUnique({
      where: { id: job.data.orderId },
      include: { items: { include: { variant: true } } },
    });
    if (!order) {
      this.logger.warn(`Order ${job.data.orderId} vanished — skipping push`);
      return { diaSiparisKodu: null };
    }
    if (order.diaSiparisKodu) {
      this.logger.log(`Order ${order.id} already pushed (${order.diaSiparisKodu})`);
      return { diaSiparisKodu: order.diaSiparisKodu };
    }

    // Skip the actual DIA round-trip if we're running with placeholder creds.
    if (process.env['DIA_PASSWORD'] === 'devplaceholder') {
      this.logger.warn(
        `[DEV] DIA_PASSWORD is the dev placeholder — recording a fake diaSiparisKodu`,
      );
      const fake = `DEV-${order.orderNumber}`;
      await this.prisma.order.update({
        where: { id: order.id },
        data: { diaSiparisKodu: fake },
      });
      return { diaSiparisKodu: fake };
    }

    const result = await this.dia.scf.siparisEkle({
      carikartkodu: 'GUEST', // Phase 4: real carikart for logged-in users
      tarih: new Date().toISOString().slice(0, 10),
      kalemler: order.items.map((line) => ({
        stokkartkodu: line.variant.diaStokkartkodu,
        miktar: line.quantity,
        birimfiyat: line.unitPriceMinor / 100,
      })),
    });

    await this.prisma.order.update({
      where: { id: order.id },
      data: { diaSiparisKodu: result.siparisnumarasi },
    });
    this.logger.log(`Pushed order ${order.id} → DIA ${result.siparisnumarasi}`);
    return { diaSiparisKodu: result.siparisnumarasi };
  }
}
