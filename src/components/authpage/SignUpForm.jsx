import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../../scss/components/authpage/SignUpForm.scss';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log('회원가입 데이터:', data);
    // TODO: 회원가입 API 호출
  };

  const password = watch('password');

  return (
    <div className="signup">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="이메일 입력"
            {...register('email', {
              required: '이메일은 필수 입력 항목입니다.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '유효한 이메일 형식을 입력하세요.',
              },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임 입력"
            {...register('nickname', {
              required: '닉네임은 필수 입력 항목입니다.',
              minLength: {
                value: 2,
                message: '닉네임은 최소 2자 이상이어야 합니다.',
              },
              maxLength: {
                value: 10,
                message: '닉네임은 최대 10자까지 입력 가능합니다.',
              },
              pattern: {
                value: /^[a-zA-Z0-9가-힣]+$/,
                message: '닉네임은 영문, 숫자, 한글만 입력 가능합니다.',
              },
            })}
          />
          {errors.nickname && (
            <p className="error-message">{errors.nickname.message}</p>
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
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상이어야 합니다.',
              },
              maxLength: {
                value: 20,
                message: '비밀번호는 최대 20자까지 입력 가능합니다.',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                message:
                  '비밀번호는 대문자, 소문자, 숫자 중 2가지 조합이어야 합니다.',
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="비밀번호 확인"
            {...register('confirmPassword', {
              required: '비밀번호 확인은 필수 입력 항목입니다.',
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">전화번호</label>
          <input
            id="phone"
            type="tel"
            placeholder="전화번호 입력"
            {...register('phone', {
              required: '전화번호는 필수 입력 항목입니다.',
              pattern: {
                value: /^\d{10,11}$/,
                message: '유효한 전화번호를 입력하세요.',
              },
            })}
          />
          {errors.phone && (
            <p className="error-message">{errors.phone.message}</p>
          )}
        </div>

        <button type="submit" className="signup-button">
          회원가입하기
        </button>
      </form>

      {/* 로그인 링크 */}
      <div className="redirect-login">
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
