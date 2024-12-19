import { Outlet } from 'react-router-dom';
import Header from '../components/layoutpage/Header';
import Footer from '../components/layoutpage/Footer';

const LayoutPage = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutPage;
