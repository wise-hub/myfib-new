// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../components/MainLayout';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isLoginPage = router.pathname === '/login';

  return isLoginPage ? (
    <Component {...pageProps} />
  ) : (
      <ProtectedRoute>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProtectedRoute>
  );
}
