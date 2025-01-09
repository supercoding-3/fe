import { createSlice } from '@reduxjs/toolkit';

// 리덕스설명 3: 리듀서가 액션을 받아서 새로운 상태를 반환
// 동기 액션은 바로 상태 업데이트
// 비동기 액션(createAsyncThunk)은 extraReducers를 사용하여 상태 업데이트
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
