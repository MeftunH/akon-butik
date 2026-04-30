/**
 * DIA's web service is JSON-over-HTTPS POST. Requests look like:
 *   { "<service_name>": { "session_id": "...", "filters": [...], "params": {...}, ... } }
 * Responses look like:
 *   { "code": "200", "msg": "...", "result": [...] | {...} }
 *
 * HTTP is always 200 even on errors — we MUST inspect `code`.
 */

export interface DiaResponse<T> {
  code: string;
  msg?: string;
  result?: T;
}

export interface DiaListResult<T> {
  records: readonly T[];
  // DIA does not return a cursor; callers must use keyset pagination on the highest sort key
  totalRecord?: number;
}

export interface Sort { field: string; sorttype: 'ASC' | 'DESC' }

export interface StokkartFilter {
  field: string;
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'LIKE' | 'IN' | 'NOT IN';
  value: string | number | boolean | readonly (string | number)[];
}

export interface ListParams {
  filters?: readonly StokkartFilter[];
  sorts?: readonly Sort[];
  selectedColumns?: readonly string[];
  limit?: number;
  offset?: number;
  /** SCF-specific: skip stock calculation for faster catalog scans */
  miktarlariHesapla?: 'True' | 'False';
}

// ─── Entity shapes (loose — DIA fields are free-form; we only type fields we read) ───

/**
 * Free-form on the wire — DIA returns whichever subset of fields the tenant
 * actually has populated. The akonbutik tenant schema (verified against
 * akonbutik.ws.dia.com.tr/api/v3 on 2026-04-30) does not expose
 * `urungrubu`, `urunmodelkodu`, `markakodu`, `kategorikodu`, `beden`, or
 * `renk` as selectable columns — `selectedcolumns` requesting any of them
 * returns HTTP 500 "Hatalı Veri". The columns kept here are the ones
 * confirmed available on this tenant. Other tenants may expose more; the
 * mapper layer treats every field as optional.
 *
 * Sale price field is `fiyat1` (DIA's free-form fiyat slot 1), not
 * `satisfiyati1` — the documented field name only exists on certain
 * defter-i kebir setups.
 */
export interface Stokkart {
  _key?: string;
  stokkartkodu: string;
  aciklama: string;
  birimkodu?: string;
  /**
   * DIA encodes numeric fields as strings with a fixed decimal scale on
   * most tenants (e.g. "4000.0000000000"), but a few legacy tenants
   * return raw numbers. Accept both at the type level — the consumer
   * normalises via parseDiaDecimalToMinor / parseDiaInt.
   */
  fiyat1?: string | number;
  fiili_stok?: string | number;
  durum?: 'A' | 'P';
  /** B2C visibility flag — 'E' = Evet (active), 'H' = Hayır (inactive) */
  b2c_durum?: 'E' | 'H';
  b2c_depomiktari?: string | number;
  stokkartturu?: string;
  anabarkod?: string;
  marka?: string;
  markaack?: string;
  /**
   * Below fields are documented in the DIA API but NOT exposed by the
   * akonbutik tenant; kept optional for forward compatibility with other
   * tenants. Asking for them via `selectedcolumns` against akonbutik
   * returns 500.
   */
  satisfiyati1?: number;
  urungrubu?: string;
  urunmodelkodu?: string;
  markakodu?: string;
  kategorikodu?: string;
  beden?: string;
  renk?: string;
  [key: string]: unknown;
}

export interface StokkartKategorisi {
  _key?: string;
  kategorikodu: string;
  aciklama: string;
  ustkategorikodu?: string;
  [key: string]: unknown;
}

export interface StokkartMarka {
  _key?: string;
  markakodu: string;
  aciklama: string;
  [key: string]: unknown;
}

export interface Carikart {
  _key?: string;
  carikartkodu: string;
  unvan: string;
  email?: string;
  vergidairesi?: string;
  vergino?: string;
  [key: string]: unknown;
}

export interface CarikartAdresi {
  _key?: string;
  adreskodu: string;
  carikartkodu: string;
  adres?: string;
  il?: string;
  ilce?: string;
  postakodu?: string;
  telefon?: string;
  [key: string]: unknown;
}

export interface Siparis {
  _key?: string;
  siparisnumarasi: string;
  carikartkodu: string;
  tarih: string;
  toplamtutar: number;
  [key: string]: unknown;
}

export interface SiparisKalemi {
  stokkartkodu: string;
  miktar: number;
  birimfiyat: number;
  birimkodu?: string;
  [key: string]: unknown;
}

export interface Fatura {
  _key?: string;
  faturanumarasi: string;
  tarih: string;
  toplamtutar: number;
  [key: string]: unknown;
}
