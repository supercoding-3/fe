import { Outlet } from 'react-router-dom';
import '@/scss/pages/layout-page.scss';
import Header from '@/components/layout-page/Header';
import Footer from '@/components/layout-page/Footer';

const LayoutPage = () => {
  return (
    <div className="layout-page">
      <div className="layout-page__content">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default LayoutPage;
