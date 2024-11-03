import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = new URL(window.location.href).hash.split('access_token=')[1];
    window.history.replaceState(null, '', window.location.pathname);

    if (token) {
      sessionStorage.setItem('token', token);
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return <div>Loading...</div>;
};

export default AuthPage;
