import { Suspense } from 'react';

import { LoginForm } from './_components/LoginForm';

export const metadata = {
  title: 'Giriş Yap',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
