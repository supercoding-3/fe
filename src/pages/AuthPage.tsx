import { useLocation } from 'react-router-dom';
import LoginForm from '@/components/authpage/LoginForm';
import SignUpForm from '@/components/authpage/SignUpForm';

const AuthPage = () => {
  const location = useLocation();

  switch (location.pathname) {
    case '/login':
      return <LoginForm />;
    case '/signup':
      return <SignUpForm />;
    default:
      return <div>잘못된 접근입니다.</div>;
  }
};

export default AuthPage;
