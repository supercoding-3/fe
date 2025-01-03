import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios/axios';
import '../../scss/components/authpage/LoginForm.scss';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const requestBody = {
      userEmail: data.email,
      userPassword: data.password,
    };

    try {
      // API 호출
      const response = await axios.post('/user/login', requestBody);

      if (response.status === 200) {
        // 로그인 성공 처리
        alert('로그인 성공!');
        // TODO: 사용자 정보를 저장하거나, 토큰 처리
        navigate('/'); // 홈으로 리디렉션
      }
    } catch (error) {
      if (error.response) {
        // 서버에서 반환된 오류 메시지
        alert(`로그인 실패: ${error.response.data.message}`);
      } else {
        alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

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
    </>
  );
};

export default LoginForm;
