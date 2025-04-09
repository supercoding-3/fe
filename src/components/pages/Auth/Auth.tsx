import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoArrowForwardCircle } from 'react-icons/io5';
import './auth.scss';
import { Button, Input, FormError } from '@/components/ui';
import logo from '@/assets/images/logo.png';
import { AUTH_FORM_LOGIN, AUTH_FORM_SIGNUP } from '@/constants/authForm';
import { userApi } from '@/api';
import { AuthForm } from '@/types';
import { setLogin } from '@/redux/reducers/user';

const Auth = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<AuthForm>({} as AuthForm);

  const pathname = location.pathname.slice(1);
  const formInputs = pathname === 'login' ? AUTH_FORM_LOGIN : AUTH_FORM_SIGNUP;
  const linkMessage = pathname === 'login' ? '회원가입' : '로그인';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (pathname === 'signup') {
        await userApi.signup(formValues);
        navigate('/login');
        return;
      }
      const response = await userApi.login(formValues);
      dispatch(setLogin(response));
      navigate('/');
    } catch (error) {
      setError('로그인 중에 오류가 발생했습니다');
    }
  };

  useEffect(() => {
    setFormValues({} as AuthForm);
  }, [pathname]);

  return (
    <div className="auth">
      <div className="auth__title">
        <img src={logo} alt="logo" />
        <div></div>
        <h1>{pathname.toUpperCase()}</h1>
      </div>
      <form onSubmit={handleSubmit} className="auth__form">
        {formInputs.map((input) => (
          <label key={input.id}>
            {input.label}
            <Input
              {...input}
              value={formValues[input.id as keyof AuthForm] || ''}
              onChange={handleInputChange}
            />
          </label>
        ))}
        <Button>확인</Button>
      </form>
      <Link
        to={pathname === 'login' ? '/signup' : '/login'}
        className="auth__link"
      >
        <IoArrowForwardCircle />
        {linkMessage}
      </Link>
      {error && <FormError>{error}</FormError>}
    </div>
  );
};

export default Auth;
