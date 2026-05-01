'use client';

import { useEffect, useState } from 'react';

import { formatRelative } from './format';

interface OrderRelativeTimeProps {
  iso: string;
  /** Server-rendered fallback so SSR markup matches the first paint. */
  initialLabel: string;
  /** Absolute date string shown beneath the relative label. */
  absoluteLabel: string;
  /** Outer wrapper class (typically the module's `.relTime`). */
  className?: string | undefined;
  /** Class on the inline absolute label rendered below the relative one. */
  absoluteClassName?: string | undefined;
}

/**
 * Live-updating relative timestamp. SSR renders `initialLabel` from the
 * request-time clock; on hydration we re-tick every 60s so a manager
 * watching the orders list sees "3dk önce" become "4dk önce" without a
 * page refresh. No flash on hydration: the first client render reuses
 * `initialLabel` until the next interval fires.
 */
export function OrderRelativeTime({
  iso,
  initialLabel,
  absoluteLabel,
  className,
  absoluteClassName,
}: OrderRelativeTimeProps) {
  const [label, setLabel] = useState(initialLabel);

  useEffect(() => {
    const tick = (): void => {
      const next = formatRelative(iso, Date.now());
      if (next) setLabel(next);
    };
    const id = window.setInterval(tick, 60_000);
    return () => {
      window.clearInterval(id);
    };
  }, [iso]);

  return (
    <span className={className}>
      <time dateTime={iso} title={absoluteLabel}>
        {label}
      </time>
      <span className={absoluteClassName}>{absoluteLabel}</span>
    </span>
  );
}
