import { MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { DiaClient } from './client.js';
import { DiaApiError, DiaInvalidSessionError } from './errors.js';

// DIA returns session id in `msg` on a successful login (code "200").
// Real production response confirmed against akonbutik.ws.dia.com.tr/api/v3.
const loginSuccess = {
  code: '200',
  msg: 'fake-session-token-for-testing',
  warnings: [],
};
const invalidSession = { code: 'INVALID_SESSION', msg: 'Session expired' };
const stokkartListele = {
  code: '200',
  result: [
    { _key: '1', stokkartkodu: 'AKB-001-XS-BROWN', aciklama: 'XS Kahverengi', durum: 'A' },
    { _key: '2', stokkartkodu: 'AKB-001-S-BROWN', aciklama: 'S Kahverengi', durum: 'A' },
  ],
};

const ORIGIN = 'https://akonbutik.ws.dia.com.tr';
const BASE_URL = `${ORIGIN}/api/v3`;
let mockAgent: MockAgent;

beforeEach(() => {
  mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  setGlobalDispatcher(mockAgent);
});

afterEach(async () => {
  await mockAgent.close();
});

function makeClient(): DiaClient {
  return new DiaClient({
    baseUrl: BASE_URL,
    sunucuKodu: 'akonbutik',
    firmaKodu: 1,
    donemKodu: 1,
    username: 'akonwb',
    password: 'secret',
    apiKey: 'test-api-key',
  } as never);
}

describe('DiaClient', () => {
  it('logs in on first call and reuses the session', async () => {
    const pool = mockAgent.get(ORIGIN);
    pool.intercept({ path: '/api/v3/sis/json', method: 'POST' }).reply(200, loginSuccess);
    pool
      .intercept({ path: '/api/v3/scf/json', method: 'POST' })
      .reply(200, stokkartListele)
      .times(2);

    const client = makeClient();
    const a = await client.scf.stokkartListele({ limit: 100 });
    const b = await client.scf.stokkartListele({ limit: 100 });

    expect(a.length).toBe(2);
    expect(b.length).toBe(2);
    expect(a[0]?.stokkartkodu).toBe('AKB-001-XS-BROWN');
  });

  it('re-logs in once on INVALID_SESSION and retries', async () => {
    const pool = mockAgent.get(ORIGIN);
    pool.intercept({ path: '/api/v3/sis/json', method: 'POST' }).reply(200, loginSuccess).times(2);
    pool.intercept({ path: '/api/v3/scf/json', method: 'POST' }).reply(200, invalidSession);
    pool.intercept({ path: '/api/v3/scf/json', method: 'POST' }).reply(200, stokkartListele);

    const client = makeClient();
    const result = await client.scf.stokkartListele({ limit: 100 });
    expect(result.length).toBe(2);
  });

  it('throws DiaInvalidSessionError if re-login also fails with invalid session', async () => {
    const pool = mockAgent.get(ORIGIN);
    pool.intercept({ path: '/api/v3/sis/json', method: 'POST' }).reply(200, loginSuccess).times(2);
    pool
      .intercept({ path: '/api/v3/scf/json', method: 'POST' })
      .reply(200, invalidSession)
      .times(2);

    const client = makeClient();
    await expect(client.scf.stokkartListele({ limit: 100 })).rejects.toBeInstanceOf(
      DiaInvalidSessionError,
    );
  });

  it('throws DiaApiError on non-200 DIA codes', async () => {
    const pool = mockAgent.get(ORIGIN);
    pool.intercept({ path: '/api/v3/sis/json', method: 'POST' }).reply(200, loginSuccess);
    pool
      .intercept({ path: '/api/v3/scf/json', method: 'POST' })
      .reply(200, { code: '500', msg: 'permission denied' });

    const client = makeClient();
    await expect(client.scf.stokkartListele({ limit: 100 })).rejects.toBeInstanceOf(DiaApiError);
  });
});
