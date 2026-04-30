import Link from 'next/link';
import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface StaticPageProps {
  title: string;
  lead?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  /**
   * Marker that the copy on this page is a temporary placeholder. When
   * the real, legally-reviewed text from the client lands, drop this prop
   * — the yellow callout disappears.
   */
  draft?: boolean;
  children: ReactNode;
}

/**
 * Shared chrome for all static / informational pages — about, contact,
 * KVKK, return policy, FAQ, track-order, etc. Keeps the page title +
 * breadcrumb + lead paragraph + body container consistent across the
 * site, so future copy edits don't drift in markup.
 */
export function StaticPage({ title, lead, breadcrumbs, draft = false, children }: StaticPageProps) {
  return (
    <main className="static-page">
      <section className="container py-5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="mb-4 small text-muted">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/" className="text-muted">
                  Ana Sayfa
                </Link>
              </li>
              {breadcrumbs.map((b, i) => (
                <li
                  key={b.label}
                  className={`breadcrumb-item${i === breadcrumbs.length - 1 ? ' active' : ''}`}
                  aria-current={i === breadcrumbs.length - 1 ? 'page' : undefined}
                >
                  {b.href ? (
                    <Link href={b.href} className="text-muted">
                      {b.label}
                    </Link>
                  ) : (
                    b.label
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <header className="mb-4">
          <h1 className="h2 fw-bold mb-2">{title}</h1>
          {lead && <p className="lead text-muted mb-0">{lead}</p>}
        </header>

        {draft && (
          <div className="alert alert-warning small mb-4" role="note">
            <strong>Taslak içerik —</strong> bu metin geçici, hukuki onay bekleniyor. Müşteri
            tarafından kesin metin gelince güncellenecek.
          </div>
        )}

        <article className="static-page__body">{children}</article>
      </section>
    </main>
  );
}
