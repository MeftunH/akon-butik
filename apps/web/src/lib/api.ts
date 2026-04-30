import { env } from '../config/env';

/**
 * Server-side fetch helper with sensible defaults for RSC.
 * - Uses API_INTERNAL_URL (server-only env)
 * - Sets next.revalidate so RSC pages are ISR'd
 * - Throws on non-2xx
 */
export async function api<TResponse>(
  path: string,
  init: RequestInit & { revalidate?: number; tags?: string[] } = {},
): Promise<TResponse> {
  const url = new URL(path.replace(/^\//, ''), `${env.API_INTERNAL_URL}/`);
  const res = await fetch(url, {
    ...init,
    headers: { 'content-type': 'application/json', ...init.headers },
    next: {
      revalidate: init.revalidate ?? 300,
      ...(init.tags && { tags: init.tags }),
    },
  });
  if (!res.ok) {
    throw new ApiError(`${res.status.toString()} ${res.statusText} for ${path}`, res.status);
  }
  return (await res.json()) as TResponse;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
