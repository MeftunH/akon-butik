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

export type Sort = { field: string; sorttype: 'ASC' | 'DESC' };

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

export interface Stokkart {
  _key?: string;
  stokkartkodu: string;
  aciklama: string;
  birimkodu?: string;
  /** Sale price */
  satisfiyati1?: number;
  durum?: 'A' | 'P';
  b2c_durum?: 'E' | 'H';
  b2c_depomiktari?: number;
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
