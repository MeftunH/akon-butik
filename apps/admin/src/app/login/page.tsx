import type { Metadata } from 'next';

import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Giriş',
  description: 'Akon Butik yönetim paneli giriş ekranı.',
  robots: { index: false, follow: false },
};

export default function LoginPage(): React.JSX.Element {
  return <LoginForm />;
}
