import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
// pages
import LayoutPage from '../pages/LayoutPage';
import HomePage from '../pages/HomePage';
import AddProductPage from '../pages/AddProductPage';
import DetailPage from '../pages/DetailPage';
import ChatPage from '../pages/ChatPage';
import ChatListPage from '../pages/ChatListPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import AuthPage from '../pages/AuthPage';

const Router = () => {
  // TODO: useSelector로 실제 값 가져오기
  const isLogin = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/product/:id" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route element={<PrivateRoute isLogin={isLogin} />}>
            <Route path="/product/add" element={<AddProductPage />} />
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
