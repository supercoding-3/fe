import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
// pages
import LayoutPage from '../pages/LayoutPage';
import HomePage from '../pages/HomePage';
import ProductModifyPage from '../pages/ProductModifyPage';
import ProductPage from '../pages/ProductPage';
import ChatPage from '../pages/ChatPage';
import ChatListPage from '../pages/ChatListPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import AuthPage from '../pages/AuthPage';
import ProfileEdit from '../components/profilepage/ProfileEdit';

const Router = () => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route element={<PrivateRoute isLogin={isLogin} />}>
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/product/create" element={<ProductModifyPage />} />
            <Route path="/product/edit" element={<ProductModifyPage />} />
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
