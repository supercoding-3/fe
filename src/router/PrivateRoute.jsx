import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
