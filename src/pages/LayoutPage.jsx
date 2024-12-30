import { Outlet } from 'react-router-dom';
import Header from '../components/layoutpage/Header';
import Footer from '../components/layoutpage/Footer';
import '../scss/pages/LayoutPage.scss';

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
