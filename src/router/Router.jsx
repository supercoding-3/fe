import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
// pages
import LayoutPage from '../pages/LayoutPage';
import HomePage from '../pages/HomePage';
import AddProductPage from '../pages/AddProductPage';
import ProductPage from '../pages/ProductPage';
import ChatPage from '../pages/ChatPage';
import ChatListPage from '../pages/ChatListPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import AuthPage from '../pages/AuthPage';
import {useSelector} from "react-redux";
import ProfileEdit from "../components/profilepage/ProfileEdit";

const Router = () => {
  // TODO: useSelector로 실제 값 가져오기
  const isLogin = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit" element={<ProfileEdit />} />
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
