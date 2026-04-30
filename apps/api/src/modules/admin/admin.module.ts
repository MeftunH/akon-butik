import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { DIA_SYNC_QUEUE } from '../dia/workers/sync.constants';

import { AdminSyncController } from './admin-sync.controller';

@Module({
  imports: [BullModule.registerQueue({ name: DIA_SYNC_QUEUE })],
  controllers: [AdminSyncController],
})
export class AdminModule {}
