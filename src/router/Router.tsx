import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import PrivateRoute from '@/router/PrivateRoute';
import Layout from '@/components/layout/Layout';
import {
  Home,
  Auth,
  Product,
  ProductModify,
  ChatList,
  Chat,
  MyPage,
  Error,
} from '@/components/pages';

const Router = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/product/:id" element={<Product />} />
          <Route element={<PrivateRoute isLogin={isLoggedIn} />}>
            <Route path="/product/create" element={<ProductModify />} />
            <Route path="/product/:id/edit" element={<ProductModify />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route
            path="*"
            element={<Error errorMessage="페이지를 찾을 수 없습니다" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
