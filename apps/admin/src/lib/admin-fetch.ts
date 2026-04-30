import { cookies } from 'next/headers';

const NOT_AUTHENTICATED = Symbol.for('akonbutik.admin.unauthenticated');
export type AdminUnauthenticated = typeof NOT_AUTHENTICATED;
export const ADMIN_NOT_AUTHENTICATED: AdminUnauthenticated = NOT_AUTHENTICATED;

// Read directly from process.env — this lib is consumed by RSC layouts at
// request time and the admin app does not run a typed env-config module
// at this layer (every read here is a server-only fetch with the ambient
// API_INTERNAL_URL injected by the dev/prod env file).
// eslint-disable-next-line no-restricted-syntax
const apiInternal = process.env.API_INTERNAL_URL ?? 'http://localhost:4000/api';

/**
 * Server-side fetch helper for admin RSC pages: forwards the inbound
 * akon_admin_at cookie to the API and surfaces 401 as a sentinel so
 * pages can redirect to /login.
 */
export async function fetchAdmin<T>(
  path: string,
  init: RequestInit = {},
): Promise<T | AdminUnauthenticated> {
  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const url = new URL(path.replace(/^\//, ''), `${apiInternal}/`);
  const res = await fetch(url, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(cookieHeader && { cookie: cookieHeader }),
      ...init.headers,
    },
    cache: 'no-store',
  });
  if (res.status === 401) return ADMIN_NOT_AUTHENTICATED;
  if (!res.ok) {
    throw new Error(`${res.status.toString()} ${res.statusText} for ${path}`);
  }
  return (await res.json()) as T;
}
