import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
// pages
import LayoutPage from '../pages/LayoutPage';
import Homepage from '../pages/Homepage';
import AddProductPage from '../pages/AddProductPage';
import DetailPage from '../pages/DetailPage';
import ChatPage from '../pages/ChatPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import Login from "../components/authpage/Login";
import SignUp from "../components/authpage/SignUp";

const Router = () => {
  // TODO: useSelector로 실제 값 가져오기
  const isLogin = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route element={<PrivateRoute isLogin={isLogin} />}>
            <Route path="/product/add" element={<AddProductPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
