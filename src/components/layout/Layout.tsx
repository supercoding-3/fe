import { useLocation, Outlet } from 'react-router-dom';
import './layout.scss';
import Footer from '@/components/layout/Footer';

const Layout = () => {
  const location = useLocation();

  // '/chat/:id' 경로에서만 숨기기
  const hideNav = /^\/chat\/\w+/.test(location.pathname);

  return (
    <div className="layout">
      <main className="layout__main">
        <Outlet />
      </main>
      {!hideNav && (
        <footer className="layout__footer">
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;
