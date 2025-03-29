import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* routers */
import PrivateRoute from '@/router/PrivateRoute';
/* layouts */
import Layout from '@/components/layout/Layout';
/* pages */
import HomePage from '@/pages/HomePage';
import AuthPage from '@/pages/AuthPage';
import ProductModifyPage from '@/pages/ProductModifyPage';
import ProductPage from '@/pages/ProductPage';
import ChatPage from '@/pages/ChatPage';
import ChatListPage from '@/pages/ChatListPage';
import ProfilePage from '@/pages/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route element={<PrivateRoute isLogin={true} />}>
            <Route path="/product/create" element={<ProductModifyPage />} />
            <Route path="/product/:id/edit" element={<ProductModifyPage />} />
            <Route path="/chat" element={<ChatListPage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
