import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navStyles from '../styles/navigation.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const customerData = JSON.parse(sessionStorage.getItem('customerData') || '{}');
  const fullNameCyrillic = customerData?.customer?.[0]?.fullNameCyrillic || 'Гост';
  const defaultAccount = customerData?.customer?.[0]?.account?.find((acc: any) => acc.defaultAccount === 'Y');
  const accountDescription = defaultAccount ? defaultAccount.acDesc : 'No default account';

  return (
    <div className={navStyles.mainWrapper}>
      {/* Top Navbar */}
      <header className={navStyles.topNavbar}>
        <div className={navStyles.topNavbarContent}>
          <div className={navStyles.logoWrapper}>
            <Image src="/images/fibank-logo.png" alt="Fibank Logo" width={170} height={40} />
          </div>
          
          <div className={navStyles.topNavbarRight}>
            <Link href="/en" className={navStyles.topNavLink}>ENGLISH</Link>
            <Link href="/help" className={navStyles.topNavLink}>ПОМОЩ</Link>
            <Link href="/messages" className={navStyles.topNavLink}>СЪОБЩЕНИЯ</Link>
            <Link href="/notifications" className={navStyles.topNavLink}>ИЗВЕСТИЯ</Link>
            <Link href="/settings" className={navStyles.topNavLink}>НАСТРОЙКИ</Link>
            <button
              className={navStyles.logoutButton}
              onClick={() => {
                sessionStorage.clear();
                window.location.href = '/';
              }}
            >
              ИЗХОД
            </button>
          </div>
        </div>
      </header>

      {/* Left Navbar and Main Content */}
      <div className={navStyles.mainContainer}>
        <nav className={navStyles.leftNavbar}>
          <div className={navStyles.userInfo}>
            <p><span>Потребител:</span> {fullNameCyrillic}</p>
            <p><span>Клиент:</span> {fullNameCyrillic}</p>
          </div>

          <button className={navStyles.primaryButton}>
            НОВ ПРЕВОД
          </button>
          <Link href="/dashboard" className={navStyles.navLink}>Начало</Link>
          <Link href="/accounts" className={navStyles.navLink}>Сметки</Link>
          <Link href="/cards" className={navStyles.navLink}>Карти</Link>
        </nav>

        <div className={navStyles.contentContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
