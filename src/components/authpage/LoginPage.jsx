import {useForm} from "react-hook-form";
import "../../scss/Login.scss";
import {Link} from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    console.log("로그인 데이터:", data);
    // TODO: 로그인 API 호출
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
              {...register("email", {required: "이메일은 필수 입력 항목입니다."})}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호 입력"
              {...register("password", {required: "비밀번호는 필수 입력 항목입니다."})}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <div className="sign-up">계정이 없으신가요?<span><Link to="/signUp"> 회원가입</Link></span></div>
      </div>
    </>
  );
};

export default LoginPage;
