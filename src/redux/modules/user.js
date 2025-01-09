import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: true,
    userInfo: null,
  },
  reducers: {
    setLogin: (state, action) => {
      console.log('payload', action.payload);
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.userInfo = null;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
