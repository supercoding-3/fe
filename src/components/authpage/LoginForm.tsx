import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from '../../axios/axios';
import '../../scss/components/authpage/LoginForm.scss';
import { setLogin } from '../../redux/reducers/user';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useForm에서 타입 정의
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // onSubmit 함수 타입 정의
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const requestBody = {
      userEmail: data.email,
      userPassword: data.password,
    };
    try {
      const response = await axios.post('/user/login', requestBody);
      if (response.status === 200) {
        alert('로그인 성공!');
        dispatch(setLogin('true'));
        navigate('/');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('회원가입된 계정이 아닙니다.');
      } else if (error.response && error.response.status === 401) {
        alert('비밀번호가 일치하지 않습니다.');
      } else {
        alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
      console.error('로그인 오류:', error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="이메일 입력"
            {...register('email', {
              required: '이메일은 필수 입력 항목입니다.',
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호 입력"
            {...register('password', {
              required: '비밀번호는 필수 입력 항목입니다.',
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
      <div className="sign-up">
        계정이 없으신가요?
        <span>
          <Link to="/signup"> 회원가입</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
