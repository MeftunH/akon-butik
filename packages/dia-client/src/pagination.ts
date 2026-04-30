import type { ListParams, Sort } from './types.js';

/**
 * Iterate a DIA `_listele` endpoint via keyset pagination on a stable, ascending key
 * (e.g. `stokkartkodu`). Avoids `offset` because DIA discourages it — the underlying
 * query slows down quadratically as offset grows.
 *
 * Usage:
 *   for await (const page of keysetIterate({
 *     keyField: 'stokkartkodu',
 *     pageSize: 100,
 *     fetch: (params) => dia.scf.stokkartListele(params),
 *   })) { ... }
 */
export interface KeysetIterateOptions<T> {
  keyField: string;
  pageSize: number;
  /** Extra filters applied to every page. */
  baseFilters?: ListParams['filters'];
  /** Extra columns selected on every page. */
  selectedColumns?: ListParams['selectedColumns'];
  /** Initial cursor — only records with key > startAfter are returned. */
  startAfter?: string;
  fetch: (params: ListParams) => Promise<readonly T[]>;
}

export async function* keysetIterate<T extends Record<string, unknown>>(
  opts: KeysetIterateOptions<T>,
): AsyncGenerator<readonly T[], void, undefined> {
  let cursor = opts.startAfter;
  const sorts: readonly Sort[] = [{ field: opts.keyField, sorttype: 'ASC' }];

  // We loop forever and break on a short page.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    const filters: ListParams['filters'] = [
      ...(opts.baseFilters ?? []),
      ...(cursor ? [{ field: opts.keyField, operator: '>' as const, value: cursor }] : []),
    ];
    const page = await opts.fetch({
      filters,
      sorts,
      ...(opts.selectedColumns && { selectedColumns: opts.selectedColumns }),
      limit: opts.pageSize,
    });
    if (page.length === 0) return;
    yield page;
    if (page.length < opts.pageSize) return;
    const last = page[page.length - 1];
    if (!last) return;
    const nextCursor = last[opts.keyField];
    if (typeof nextCursor !== 'string') {
      throw new Error(`keysetIterate: ${opts.keyField} on last record is not a string`);
    }
    cursor = nextCursor;
  }
}
