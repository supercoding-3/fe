import { Outlet } from 'react-router-dom';
import Header from "../components/layout-page/Header";
import Footer from "../components/layout-page/Footer";

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
