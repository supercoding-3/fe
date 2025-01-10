import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from '../../axios/axios';
import {setLogin} from '../../redux/modules/user';
import '../../scss/components/authpage/LoginForm.scss';

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
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
    } catch (error) {
      // 서버에서 반환한 상태 코드 확인
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


  // 리덕스설명 1: setLogin이라는 action을 store(store.js)에 전달

  // 리덕스설명 5: 스토어 상태를 구독. 상태가 변경되면 컴포넌트는 리렌더링 됨.
  let isLogin = false;
  isLogin = useSelector((state) => state.user.isLogin);

  return (
    <>
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

          <button type="submit" className="login-button" >
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
    </>
  );
};

export default LoginForm;
