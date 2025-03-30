import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import PrivateRoute from '@/router/PrivateRoute';
import Layout from '@/components/layout/Layout';
import {
  Home,
  Auth,
  ProductModify,
  ChatList,
  MyPage,
} from '@/components/pages';
import ChatPage from '@/pages/ChatPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProductPage from '@/pages/ProductPage';

const Router = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route element={<PrivateRoute isLogin={isLoggedIn} />}>
            <Route path="/product/create" element={<ProductModify />} />
            <Route path="/product/:id/edit" element={<ProductModify />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
