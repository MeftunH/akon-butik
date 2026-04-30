'use client';

import { useCart } from '@akonbutik/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const { refresh: refreshCart } = useCart();
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    setBusy(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      await refreshCart();
      router.push('/');
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-outline-secondary btn-sm"
      onClick={() => void onClick()}
      disabled={busy}
    >
      {busy ? 'Çıkış yapılıyor…' : 'Çıkış Yap'}
    </button>
  );
}
