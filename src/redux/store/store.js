import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../modules/user';

const store = configureStore({
  // 리덕스설명 2: 액션이 전달되면 스토어가 전달된 액션을 처할 리듀서를 찾아서 실행
  reducer: { user: userSlice },
});

export default store;
