import { createSlice } from '@reduxjs/toolkit';
import { setAuthStatus, clearAuthStatus } from '../../services/authStorage';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload;
      setAuthStatus(true);
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.userInfo = null;
      clearAuthStatus();
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
