import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/axios/axios';
import { UserState } from '@/types/User';

const initialState: UserState = {
  isLogin: false,
  user: null,
};

export const __fetchUser = createAsyncThunk('fetchUser', async (_, api) => {
  try {
    const resp = await axios.get('/user/check-login');

    if (!resp.data) {
      return api.rejectWithValue('Unauthorized');
    }

    return resp.data;
  } catch (error) {
    return api.rejectWithValue('Unauthorized');
  }
});

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
  extraReducers: (builder) => {
    builder.addCase(__fetchUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    });
    builder.addCase(__fetchUser.rejected, (state) => {
      state.isLogin = false;
      state.user = null;
    });
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
