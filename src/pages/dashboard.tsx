import { useEffect, useState } from 'react';
import { formatNumber } from '../utils/formatNumber';
import Link from 'next/link';
import dashboardStyles from '../styles/dashboard.module.css';
import navStyles from '../styles/navigation.module.css';

interface BalanceCategory {
  bal: number;
  category: string;
}

const Dashboard = () => {
  const [customerData, setCustomerData] = useState<any>(null);
  const [balanceData, setBalanceData] = useState<BalanceCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = sessionStorage.getItem('token') || '';
        if (!token) throw new Error('Token is missing. Please log in again.');

        const storedCustomerData = sessionStorage.getItem('customerData');
        if (storedCustomerData) {
          const parsedCustomerData = JSON.parse(storedCustomerData);
          setCustomerData(parsedCustomerData);
          const customerId = parsedCustomerData.customer[0]?.ibCustomerId;
          sessionStorage.setItem('customer', customerId);
          console.log('custid>>' + customerId);

          if (customerId) {
            fetchBalanceData(customerId, token);
          } else {
            throw new Error('Invalid customer data in session storage');
          }
        } else {
          const customerDataResponse = await fetch('/api/v1/sywsquery/sywsquery/getCustQuery', {
            method: 'GET',
            headers: {
              'token': token,
              'customer': '0',
              'ebank-referer': '/login',
            },
          });

          if (!customerDataResponse.ok) throw new Error('Failed to fetch customer data');
          const customerData = await customerDataResponse.json();
          setCustomerData(customerData);
          sessionStorage.setItem('customerData', JSON.stringify(customerData));
          sessionStorage.setItem('customer', customerData.customer[0]?.ibCustomerId);
          const customerId = customerData.customer[0]?.ibCustomerId;
          if (customerId) {
            fetchBalanceData(customerId, token);
          } else {
            throw new Error('Invalid customer data');
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchBalanceData = async (customerId: string, token: string) => {
      try {
        const balanceDataResponse = await fetch('/api/v1/sywsquery/sywsquery/GetCustBal?StmtType=T', {
          method: 'GET',
          headers: {
            'token': token,
            'customer': customerId,
            'ebank-referer': '/dashboard',
          },
        });

        if (!balanceDataResponse.ok) throw new Error('Failed to fetch balance data');
        const balanceData = await balanceDataResponse.json();
        setBalanceData(balanceData.categoryBal || []);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCustomerData();
  }, []);

  const getBalanceByCategory = (category: string): number | undefined => {
    const categoryBalance = balanceData.find((item) => item.category === category);
    return categoryBalance ? categoryBalance.bal : undefined;
  };  

  const availableCardBalance = getBalanceByCategory("AVL_CARD_ACC");
  const currentAccountBalance = getBalanceByCategory("CURR_CACC");
  const availableCurrentBalance = getBalanceByCategory("AVL_CACC");

  if (loading) return <p>Loading customer data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <nav className={dashboardStyles.navbar}>
      <Link href="/dashboard" className={dashboardStyles.navLink}>Начало</Link>
      </nav>
      <div className={navStyles.mainContentContainer}>
        <div className={dashboardStyles.infoBlock}>Нетна разполагаема наличност по сметки и депозити: <br></br>{formatNumber(availableCardBalance, 'bg-BG')} BGN</div>
        <div className={dashboardStyles.infoBlock}>Общо текущо салдо по сметки и депозити: <br></br>{formatNumber(currentAccountBalance, 'bg-BG')} BGN</div>
        <div className={dashboardStyles.infoBlock}>Обща нетна разполагаема наличност по картови сметки: <br></br>{formatNumber(availableCurrentBalance, 'bg-BG')} BGN</div>
      </div>
      {/* <section>
        <h2 className={dashboardStyles.sectionTitle}>Customer Data</h2>
        <pre>{JSON.stringify(customerData, null, 2)}</pre>
      </section> */}
    </div>
  );
};

export default Dashboard;
