import Link from 'next/link';

export interface TopbarProps {
  /** Marquee headline for the slim bar. */
  announcement: string;
  /** Optional left-side category links — defaults to none. */
  categoryLinks?: readonly { label: string; href: string }[];
}

/**
 * Slim announcement bar above the header. Direct port of vendor
 * `header/Topbar1.tsx` — `tf-topbar bg-black` with a 7-col left block
 * (`topbar-left` headline + button group) and a 5-col right block of
 * help links. Currency / language switchers from the demo are dropped:
 * Akon Butik is TR-only.
 */
export function Topbar({ announcement, categoryLinks }: TopbarProps) {
  return (
    <div className="tf-topbar bg-black">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8">
            <div className="topbar-left">
              <h6 className="text-up text-white fw-normal text-line-clamp-1">{announcement}</h6>
              {categoryLinks && categoryLinks.length > 0 ? (
                <div className="group-btn">
                  {categoryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="tf-btn-line letter-space-0 style-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-xl-5 col-lg-4 d-none d-lg-block">
            <ul className="topbar-right topbar-option-list">
              <li className="h6">
                <Link href="/faq" className="text-white link">
                  Yardım &amp; SSS
                </Link>
              </li>
              <li className="br-line" />
              <li className="h6">
                <Link href="/track-order" className="text-white link">
                  Sipariş Takibi
                </Link>
              </li>
              <li className="br-line d-none d-xl-inline-flex" />
              <li className="h6 d-none d-xl-block">
                <Link href="/iade-degisim" className="text-white link">
                  İade ve Değişim
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
