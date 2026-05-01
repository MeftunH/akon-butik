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
   * the real, legally reviewed text from the client lands, drop this
   * prop and the draft note disappears.
   */
  draft?: boolean;
  children: ReactNode;
}

/**
 * Shared chrome for static / informational pages: legal, FAQ, sipariş
 * takibi placeholder. Renders the vendor `s-page-title` band + the
 * `breadcrumbs-page` list (same markup as the Ocaka dashboard / blog
 * pages) so the storefront has a single page-title rhythm. The body
 * sits inside `flat-spacing-2` for editorial vertical breathing room.
 */
export function StaticPage({ title, lead, breadcrumbs, draft = false, children }: StaticPageProps) {
  return (
    <main className="static-page">
      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">{title}</h1>
            <ul className="breadcrumbs-page">
              <li>
                <Link href="/" className="h6 link">
                  Ana Sayfa
                </Link>
              </li>
              {breadcrumbs?.map((b, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <li key={b.label} className="d-flex align-items-center">
                    <i className="icon icon-caret-right" aria-hidden />
                    {b.href && !isLast ? (
                      <Link href={b.href} className="h6 link ms-2">
                        {b.label}
                      </Link>
                    ) : (
                      <h6 className="current-page fw-normal ms-2" aria-current="page">
                        {b.label}
                      </h6>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="flat-spacing-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
              {lead && <p className="h5 fw-normal text-main-2 mb-5">{lead}</p>}

              {draft && (
                <p
                  role="note"
                  className="h6 fw-normal text-main-2 mb-5"
                  style={{
                    borderTop: '1px solid var(--main-3, #e5e5e5)',
                    borderBottom: '1px solid var(--main-3, #e5e5e5)',
                    padding: '14px 0',
                    letterSpacing: '0.02em',
                  }}
                >
                  Bu metin taslak niteliğindedir. Hukuki onay sonrası nihai hâliyle yayınlanacaktır.
                </p>
              )}

              <article className="static-page__body">{children}</article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
