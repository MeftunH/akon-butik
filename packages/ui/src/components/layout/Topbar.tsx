import clsx from 'clsx';

export interface TopbarProps {
  /** A short marquee announcement (free shipping, sale banner, etc.). */
  announcement: string;
  className?: string;
}

/**
 * Slim announcement bar above the main header. Single fixed slot for now;
 * expand to a marquee if Akon Butik runs concurrent promos in the future.
 */
export function Topbar({ announcement, className }: TopbarProps) {
  return (
    <div className={clsx('topbar bg-dark text-white py-2 small text-center', className)}>
      <div className="container-fluid px_15 lg-px_40">{announcement}</div>
    </div>
  );
}
