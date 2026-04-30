import { request } from 'undici';

import { DiaTransportError } from './errors.js';

export interface TransportOptions {
  /** Per-request timeout in ms. Defaults to 30 s. DIA can be slow on big catalog scans. */
  timeoutMs?: number;
  /** Retries on transport-layer failures (not on DIA logical errors). */
  retries?: number;
  /** Initial backoff in ms; doubles each attempt. */
  backoffMs?: number;
}

/**
 * Low-level POST to a DIA endpoint. Returns the parsed JSON body.
 * Caller is responsible for inspecting the `code` field.
 */
export async function postJson<TResponse>(
  url: string,
  body: unknown,
  options: TransportOptions = {},
): Promise<TResponse> {
  const { timeoutMs = 30_000, retries = 2, backoffMs = 500 } = options;

  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await request(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(body),
        bodyTimeout: timeoutMs,
        headersTimeout: timeoutMs,
      });
      if (res.statusCode !== 200) {
        throw new DiaTransportError(`HTTP ${res.statusCode} from ${url}`);
      }
      return (await res.body.json()) as TResponse;
    } catch (err) {
      lastErr = err;
      if (attempt < retries) {
        await sleep(backoffMs * 2 ** attempt);
        continue;
      }
    }
  }
  throw new DiaTransportError(
    `Transport failed after ${(retries + 1).toString()} attempts: ${String(lastErr)}`,
    lastErr,
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
