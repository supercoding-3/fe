import { useLocation } from 'react-router-dom';
import LoginForm from '../components/authpage/LoginForm';
import SignUpForm from '../components/authpage/SignUpForm';

const AuthPage = () => {
  const location = useLocation();

  if (location.pathname === '/login') {
    return <LoginForm />;
  } else if (location.pathname === '/signup') {
    return <SignUpForm />;
  }
};

export default AuthPage;
