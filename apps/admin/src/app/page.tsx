import Link from 'next/link';

export default function AdminHome() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h5 className="mb-3">Akon Admin</h5>
        <nav>
          <Link href="/" className="active">
            Dashboard
          </Link>
          <Link href="/products">Ürünler</Link>
          <Link href="/orders">Siparişler</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/sync-log">DIA Sync Log</Link>
          <Link href="/settings">Ayarlar</Link>
        </nav>
      </aside>
      <main className="admin-main">
        <h1>Dashboard</h1>
        <p className="text-muted">
          Admin skeleton — Phase 5 will populate this with real widgets (orders today, sync
          status, low-stock variants, recent comments).
        </p>
      </main>
    </div>
  );
}
