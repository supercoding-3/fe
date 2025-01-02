import { createSlice } from '@reduxjs/toolkit';
import signUpForm from "../../components/authpage/SignUpForm";
import loginForm from "../../components/authpage/LoginForm";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: null,

  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpForm.fulfilled, (state) => {
        state.isLogin = false; // 회원가입 후 로그아웃 상태 유지
      })
      .addCase(signUpForm.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginForm.fulfilled, (state, action) => {
        state.isLogin = true;
        state.userInfo = action.payload;
      })
      .addCase(loginForm.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
