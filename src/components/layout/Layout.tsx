import { Outlet } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import './layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <Header />
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
