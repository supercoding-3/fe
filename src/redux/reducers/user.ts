import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types/User';

const initialState: UserState = {
  isLogin: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
