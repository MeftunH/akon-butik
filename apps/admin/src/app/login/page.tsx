import { LoginForm } from './LoginForm';

export const metadata = {
  title: 'Giriş',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
