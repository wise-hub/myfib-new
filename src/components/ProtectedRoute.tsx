import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const publicPaths = ['/login', '/auth'];

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const path = router.pathname;

    if (!token && !publicPaths.includes(path)) {
      router.replace('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
