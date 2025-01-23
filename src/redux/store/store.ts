import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../modules/user';

const store = configureStore({
  reducer: { users: userReducer },
});

export default store;
