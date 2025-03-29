import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLogin }: { isLogin: boolean }) => {
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
