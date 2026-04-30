import { keysetIterate } from './pagination.js';
import { SessionManager, type SessionConfig } from './session.js';
import type {
  Carikart,
  CarikartAdresi,
  Fatura,
  ListParams,
  Siparis,
  SiparisKalemi,
  Stokkart,
  StokkartKategorisi,
  StokkartMarka,
} from './types.js';

export interface DiaClientConfig extends SessionConfig {
  firmaKodu: number;
  donemKodu: number;
}

interface ListEnvelope {
  filters?: readonly { field: string; operator: string; value: unknown }[];
  sorts?: readonly { field: string; sorttype: 'ASC' | 'DESC' }[];
  params?: Record<string, unknown>;
  limit?: number;
  offset?: number;
  firma_kodu: number;
  donem_kodu: number;
  [key: string]: unknown;
}

export class DiaClient {
  private readonly session: SessionManager;
  readonly scf: ScfApi;
  readonly sis: SisApi;

  constructor(private readonly config: DiaClientConfig) {
    this.session = new SessionManager(config);
    this.scf = new ScfApi(this.session, this.config);
    this.sis = new SisApi(this.session);
  }

  /** Eagerly establish a session — useful at app boot for early-failure detection. */
  async login(): Promise<void> {
    await this.session.login();
  }
}

class SisApi {
  constructor(private readonly session: SessionManager) {}

  /** Upload a base64-encoded file (e.g. product image). Returns the AWS URL. */
  async uploadFile(payload: {
    filename: string;
    contentBase64: string;
    contentType: string;
  }): Promise<{ url: string }> {
    return this.session.call('sis', 'sis_aws_dosya_ekle', {
      dosya_adi: payload.filename,
      icerik: payload.contentBase64,
      icerik_tipi: payload.contentType,
    });
  }
}

class ScfApi {
  constructor(
    private readonly session: SessionManager,
    private readonly config: DiaClientConfig,
  ) {}

  // ─── Stokkart (products) ──────────────────────────────────────────

  async stokkartListele(params: ListParams): Promise<readonly Stokkart[]> {
    const result = await this.session.call<{ records: Stokkart[] } | Stokkart[]>(
      'scf',
      'scf_stokkart_listele',
      this.envelope(params, {
        miktarlariHesapla: params.miktarlariHesapla ?? 'False',
        ...(params.selectedColumns && { selectedcolumns: params.selectedColumns }),
      }),
    );
    return normalizeRecords(result);
  }

  /** Async iterator over the full stokkart catalogue using keyset pagination. */
  stokkartIterate(
    opts: Omit<ListParams, 'limit' | 'offset'> & { pageSize?: number; startAfter?: string },
  ): AsyncGenerator<readonly Stokkart[], void, undefined> {
    return keysetIterate<Stokkart>({
      keyField: 'stokkartkodu',
      pageSize: opts.pageSize ?? 100,
      ...(opts.filters && { baseFilters: opts.filters }),
      ...(opts.selectedColumns && { selectedColumns: opts.selectedColumns }),
      ...(opts.startAfter && { startAfter: opts.startAfter }),
      fetch: (p) => this.stokkartListele(p),
    });
  }

  async stokkartGetir(stokkartkodu: string): Promise<Stokkart> {
    return this.session.call('scf', 'scf_stokkart_getir', {
      firma_kodu: this.config.firmaKodu,
      donem_kodu: this.config.donemKodu,
      filters: [{ field: 'stokkartkodu', operator: '=', value: stokkartkodu }],
    });
  }

  /** B2C on-demand stock query (use for hot products that need fresh stock at PDP). */
  async b2cStokMiktarSorgula(stokkartkodu: string): Promise<{ miktar: number }> {
    return this.session.call('scf', 'scf_b2c_stok_miktar_sorgula', {
      firma_kodu: this.config.firmaKodu,
      donem_kodu: this.config.donemKodu,
      stokkartkodu,
    });
  }

  // ─── Categories & brands ──────────────────────────────────────────

  async kategoriListele(params: ListParams = {}): Promise<readonly StokkartKategorisi[]> {
    const result = await this.session.call<
      { records: StokkartKategorisi[] } | StokkartKategorisi[]
    >('scf', 'scf_stokkartkategorisi_listele', this.envelope(params));
    return normalizeRecords(result);
  }

  async markaListele(params: ListParams = {}): Promise<readonly StokkartMarka[]> {
    const result = await this.session.call<{ records: StokkartMarka[] } | StokkartMarka[]>(
      'scf',
      'scf_stokkartmarka_listele',
      this.envelope(params),
    );
    return normalizeRecords(result);
  }

  // ─── Customers (carikart) ─────────────────────────────────────────

  async carikartListele(params: ListParams = {}): Promise<readonly Carikart[]> {
    const result = await this.session.call<{ records: Carikart[] } | Carikart[]>(
      'scf',
      'scf_carikart_listele',
      this.envelope(params),
    );
    return normalizeRecords(result);
  }

  async carikartEkle(payload: {
    unvan: string;
    email: string;
    telefon?: string;
    [key: string]: unknown;
  }): Promise<{ carikartkodu: string }> {
    return this.session.call('scf', 'scf_carikart_ekle', {
      firma_kodu: this.config.firmaKodu,
      donem_kodu: this.config.donemKodu,
      kart: payload,
    });
  }

  async carikartAdresleriListele(carikartkodu: string): Promise<readonly CarikartAdresi[]> {
    const result = await this.session.call<
      { records: CarikartAdresi[] } | CarikartAdresi[]
    >('scf', 'scf_carikart_adresleri_listele', {
      firma_kodu: this.config.firmaKodu,
      donem_kodu: this.config.donemKodu,
      filters: [{ field: 'carikartkodu', operator: '=', value: carikartkodu }],
    });
    return normalizeRecords(result);
  }

  // ─── Orders (siparis) ─────────────────────────────────────────────

  async siparisEkle(payload: {
    carikartkodu: string;
    tarih: string;
    kalemler: readonly SiparisKalemi[];
    [key: string]: unknown;
  }): Promise<{ siparisnumarasi: string }> {
    return this.session.call('scf', 'scf_siparis_ekle', {
      firma_kodu: this.config.firmaKodu,
      donem_kodu: this.config.donemKodu,
      kart: payload,
    });
  }

  async siparisListeleAyrintili(params: ListParams = {}): Promise<readonly Siparis[]> {
    const result = await this.session.call<{ records: Siparis[] } | Siparis[]>(
      'scf',
      'scf_siparis_listele_ayrintili',
      this.envelope(params),
    );
    return normalizeRecords(result);
  }

  // ─── Invoices (fatura) ────────────────────────────────────────────

  async faturaListele(params: ListParams = {}): Promise<readonly Fatura[]> {
    const result = await this.session.call<{ records: Fatura[] } | Fatura[]>(
      'scf',
      'scf_fatura_listele',
      this.envelope(params),
    );
    return normalizeRecords(result);
  }

  // ─── helpers ──────────────────────────────────────────────────────

  private envelope(
    params: ListParams,
    extraParams: Record<string, unknown> = {},
  ): ListEnvelope {
    const env: ListEnvelope = {
      firma_kodu: this.config.firmaKodu,
      donem_kodu: this.config.donemKodu,
    };
    if (params.filters) env.filters = params.filters;
    if (params.sorts) env.sorts = params.sorts;
    if (params.limit !== undefined) env.limit = params.limit;
    if (params.offset !== undefined) env.offset = params.offset;
    if (Object.keys(extraParams).length > 0) env.params = extraParams;
    return env;
  }
}

function normalizeRecords<T>(result: { records: T[] } | readonly T[]): readonly T[] {
  if (Array.isArray(result)) return result;
  if ('records' in result && Array.isArray(result.records)) return result.records;
  return [];
}
