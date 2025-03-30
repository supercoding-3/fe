import { Outlet } from 'react-router-dom';
import './layout.scss';
import Footer from '@/components/layout/Footer';

const Layout = () => {
  return (
    <div className="layout">
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
