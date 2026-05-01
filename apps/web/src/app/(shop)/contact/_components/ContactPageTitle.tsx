import Link from 'next/link';

/**
 * /contact page-title band. Reuses the vendor `s-page-title` breadcrumb
 * pattern that is already loaded by the shop SCSS bundle. Kept separate
 * from the form so server components can render the breadcrumb without
 * pulling the form's "use client" boundary up.
 */
export function ContactPageTitle() {
  return (
    <section className="s-page-title">
      <div className="container">
        <div className="content">
          <h1 className="title-page">İletişim</h1>
          <ul className="breadcrumbs-page">
            <li>
              <Link href="/" className="h6 link">
                Ana Sayfa
              </Link>
            </li>
            <li className="d-flex">
              <i className="icon icon-caret-right" />
            </li>
            <li>
              <h6 className="current-page fw-normal">İletişim</h6>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
