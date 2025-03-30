import { BrowserRouter, Route, Routes } from 'react-router-dom';
/* layouts */
import Layout from '@/components/layout/Layout';
import AuthPage from '@/pages/AuthPage';
import ChatListPage from '@/pages/ChatListPage';
import ChatPage from '@/pages/ChatPage';
/* pages */
import HomePage from '@/pages/HomePage';
import MyPage from '@/pages/MyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProductModifyPage from '@/pages/ProductModifyPage';
import ProductPage from '@/pages/ProductPage';
/* routers */
import PrivateRoute from '@/router/PrivateRoute';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/mypage" element={<MyPage />} />
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
