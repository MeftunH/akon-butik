import { describe, expect, it, vi } from 'vitest';

import { keysetIterate } from './pagination.js';

describe('keysetIterate', () => {
  it('iterates pages until a short page is returned', async () => {
    const pages = [
      [{ stokkartkodu: 'A001' }, { stokkartkodu: 'A002' }],
      [{ stokkartkodu: 'A003' }, { stokkartkodu: 'A004' }],
      [{ stokkartkodu: 'A005' }],
    ];
    let call = 0;
    const fetch = vi.fn(async () => Promise.resolve(pages[call++] ?? []));

    const collected: string[] = [];
    for await (const page of keysetIterate<{ stokkartkodu: string }>({
      keyField: 'stokkartkodu',
      pageSize: 2,
      fetch,
    })) {
      for (const r of page) collected.push(r.stokkartkodu);
    }
    expect(collected).toEqual(['A001', 'A002', 'A003', 'A004', 'A005']);
    expect(fetch).toHaveBeenCalledTimes(3);
    // Second call must filter on key > 'A002'
    const secondCall = fetch.mock.calls[1] as [{ filters: unknown[] }] | undefined;
    expect(secondCall?.[0]?.filters).toEqual([
      { field: 'stokkartkodu', operator: '>', value: 'A002' },
    ]);
  });

  it('terminates immediately on empty first page', async () => {
    const fetch = vi.fn(async () => Promise.resolve([]));
    const collected: unknown[] = [];
    for await (const page of keysetIterate({ keyField: 'k', pageSize: 50, fetch })) {
      collected.push(page);
    }
    expect(collected).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
