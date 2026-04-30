import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Cache-bust hook for the storefront.
 *
 * Called by the API after admin writes (product edit, image upload,
 * sync trigger, etc.) so the customer-facing RSC tree picks up the new
 * data immediately instead of waiting for the 5-minute ISR window.
 *
 * Auth: shared-secret header. The API holds REVALIDATE_TOKEN in its env
 * and forwards it on every revalidate request; this route rejects
 * anything missing the token to keep public callers from forcing
 * re-renders.
 */

interface RevalidateBody {
  paths?: string[];
  tags?: string[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Server-only secret, only read here. Skipping the typed env module is
  // intentional — REVALIDATE_TOKEN is a route-local concern and adding it
  // there would force every storefront page to also know about it.
  // eslint-disable-next-line no-restricted-syntax
  const expected = process.env['REVALIDATE_TOKEN'];
  const provided = req.headers.get('x-revalidate-token');
  if (!expected || !provided || provided !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await req.json()) as RevalidateBody;
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const paths = (body.paths ?? []).filter(
    (p): p is string => typeof p === 'string' && p.startsWith('/'),
  );
  const tags = (body.tags ?? []).filter((t): t is string => typeof t === 'string');

  for (const p of paths) {
    revalidatePath(p);
  }
  for (const t of tags) {
    revalidateTag(t);
  }

  return NextResponse.json({
    revalidated: { paths, tags },
    timestamp: new Date().toISOString(),
  });
}
