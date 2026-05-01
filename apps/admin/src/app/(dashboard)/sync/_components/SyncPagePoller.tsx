'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface SyncPagePollerProps {
  /**
   * True if the latest server-rendered snapshot shows at least one
   * entity in the `running` state. The poller calls `router.refresh()`
   * every 5 s while this stays true; the next render either flips it
   * back to false (sync settled) or keeps polling.
   */
  isAnyRunning: boolean;
}

const POLL_INTERVAL_MS = 5000;

/**
 * Lightweight invalidation loop. Lives next to the sync page so we don't
 * pull a polling library or websocket layer for what is, in practice, a
 * page that only animates while a single human is staring at it. When
 * nothing is running, the effect short-circuits and no timer is set.
 */
export function SyncPagePoller({ isAnyRunning }: SyncPagePollerProps): null {
  const router = useRouter();

  useEffect(() => {
    if (!isAnyRunning) return undefined;

    const id = window.setInterval(() => {
      router.refresh();
    }, POLL_INTERVAL_MS);

    return () => {
      window.clearInterval(id);
    };
  }, [isAnyRunning, router]);

  return null;
}
