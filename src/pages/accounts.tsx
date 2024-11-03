// src/pages/accounts.tsx
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { formatNumber } from '../utils/formatNumber';
import styles from '../styles/accounts.module.css';
import navStyles from '../styles/navigation.module.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    const customer = sessionStorage.getItem('customer') || '';

    if (!token || !customer) {
      setError('Token or customer ID is missing. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/v1/sywsquery/sywsquery/GetCustBal?StmtType=T', {
          method: 'GET',
          headers: {
            'token': token,
            'customer': customer,
            'ebank-referer': '%2Faccounts',
          },
        });

        if (!response.ok) {
          setError('Failed to fetch accounts');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setAccounts(data.acc || []);
      } catch (error) {
        setError('Failed to fetch accounts');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const isPrimaryAccount = (account: any) => {
    return account.description === 'Разплащателна сметка служители';
  };

  if (loading) return <p>Loading accounts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
            <nav className={navStyles.navbar}>
      <Link href="/dashboard" className={navStyles.navLink}>Начало</Link>

      </nav>
      <div className={navStyles.mainContentContainer}>
      <table className="table">
        <thead>
          <tr>
            <th>Сметка</th>
            <th>Валута</th>
            <th className="numberColumn">Разполагаемост</th>
            <th className="numberColumn">Начално салдо</th>
            <th className="numberColumn">Текущо салдо</th>
            <th className="numberColumn">Блокирани суми</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>
                <div className={styles.accountInfo}>
                  <Image 
                    src={isPrimaryAccount(account) ? "/images/ic-dflt-account.png" : "/images/Fib_icon.png"} 
                    alt={isPrimaryAccount(account) ? "Primary Account Icon" : "Default Account Icon"} 
                    width={24} 
                    height={24} 
                  />
                  <div>
                    <div>{account.acDesc}</div>
                    <div className={styles.iban}>{account.iban}</div>
                  </div>
                </div>
              </td>
              <td>{account.ccy}</td>
              <td className="numberColumn">{formatNumber(account.acyAvlBal)}</td>
              <td className="numberColumn">{formatNumber(account.acyOpeningBal)}</td>
              <td className="numberColumn">{formatNumber(account.acyCurrBalance)}</td>
              <td className="numberColumn">{formatNumber(account.blockedAmount)}</td>
              <td>
                <button className="actionButton">📋</button>
                <button className="actionButton">⚙️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
   
  );
};

export default Accounts;
