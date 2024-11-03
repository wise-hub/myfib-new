import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';

const LoginPage = () => {
  const [token, setToken] = useState('3236dc9f-d2c1-49be-93b3-18206c3fbdc8');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      router.push(`/auth#access_token=${token}`);
    } else {
      setError('Token is required');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>My Fibank</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className={styles.inputField}
          />
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
