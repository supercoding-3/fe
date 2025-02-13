import { Outlet } from 'react-router-dom';
import '@/scss/pages/LayoutPage.scss';
import Header from '@/components/layoutpage/Header';
import Footer from '@/components/layoutpage/Footer';

const LayoutPage = () => {
  return (
    <div className="layout-page">
      <Header />
      <main className="layout-page__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
