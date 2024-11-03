// src/pages/cards.tsx
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatNumber } from '../utils/formatNumber';
import styles from '../styles/cards.module.css';

const Cards = () => {
  const [cardsInfo, setCardsInfo] = useState<any[]>([]);
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

    const fetchCardsInfo = async () => {
      try {
        const response = await fetch('/api/v1/sywsquery/sywsquery/getCardsInfo', {
          method: 'GET',
          headers: {
            'token': token,
            'customer': customer,
            'ebank-referer': '%2Fcards',
          },
        });

        if (!response.ok) {
          setError('Failed to fetch cards info');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCardsInfo(data);
      } catch (error) {
        setError('Failed to fetch cards info');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardsInfo();
  }, []);

  if (loading) return <p>Loading cards info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className={styles.sectionTitle}>Cards</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Карта</th>
            <th>Валута</th>
            <th className={styles.numberColumn}>Наличност</th>
            <th className={styles.numberColumn}>Дължима сума</th>
            <th className={styles.numberColumn}>Мин. вноска</th>
            <th>Погасяване до</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {cardsInfo.map((card, index) => (
            <tr key={index}>
              <td>
                <div className={styles.cardInfo}>
                  <Image 
                    src="/images/img_logo_visa_blue.png" 
                    alt="Visa Logo" 
                    width={30} 
                    height={20} 
                    className={styles.cardLogo} 
                  />
                  <div>
                    <div>{card.pseudonym}</div>
                    <div className={styles.cardMask}>{card.cardMask}</div>
                  </div>
                </div>
              </td>
              <td>{card.accountCcy}</td>
              <td className={styles.numberColumn}>{card.minBal ? formatNumber(card.minBal) : 'N / A'}</td>
              <td className={styles.numberColumn}>{card.totalOutstanding ? formatNumber(card.totalOutstanding) : 'N / A'}</td>
              <td className={styles.numberColumn}>{card.paidAmount ? formatNumber(card.paidAmount) : 'N / A'}</td>
              <td>{card.cardStateDesc === 'Active' ? 'Платена' : 'N / A'}</td>
              <td>
                <button className={styles.actionButton}>👁️</button>
                <button className={styles.actionButton}>❄️</button>
                <button className={styles.actionButton}>🚫</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cards;
