import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const LayoutPage = () => {
  return (
    <div className="layout">
      <div className="layout__content">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutPage;
