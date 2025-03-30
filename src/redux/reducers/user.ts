import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/types';

const initialState = {
  isLoggedIn: false,
  user: {} as User,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.user = {} as User;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
