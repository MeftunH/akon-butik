import Link from 'next/link';

export interface FooterColumn {
  title: string;
  links: readonly { label: string; href: string }[];
}

export interface FooterProps {
  brandName: string;
  tagline: string;
  columns: readonly FooterColumn[];
  /** Renders a newsletter form; see NewsletterForm. */
  newsletter?: React.ReactNode;
  /** Bottom-line copyright (year is appended automatically). */
  copyright: string;
}

export function Footer({ brandName, tagline, columns, newsletter, copyright }: FooterProps) {
  return (
    <footer className="footer style-1 has-line-top">
      <div className="container">
        <div className="footer-wrap pt_80 pb_40">
          <div className="row gx-5">
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
              <div className="footer-brand mb-3">
                <h4 className="brand-text fw-bold mb-2">{brandName}</h4>
                <p className="text-muted mb-3">{tagline}</p>
              </div>
              {newsletter}
            </div>
            {columns.map((col) => (
              <div key={col.title} className="col-lg-2 col-md-4 col-sm-6 mb-4 mb-lg-0">
                <div className="footer-col-block">
                  <div className="footer-heading text-uppercase fw-6 mb-3">{col.title}</div>
                  <ul className="footer-menu list-unstyled">
                    {col.links.map((link) => (
                      <li key={link.href} className="mb-2">
                        <Link href={link.href} className="footer-link text-muted">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom border-top py-3 text-center text-muted">
          © {new Date().getFullYear()} {copyright}
        </div>
      </div>
    </footer>
  );
}
