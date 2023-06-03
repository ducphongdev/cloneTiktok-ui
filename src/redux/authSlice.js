import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'login',
  initialState: {
    currentUser: null,
    isLogin: false,
    error: false,
    message: '',
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLogin = localStorage.getItem('accessToken') != null;
      state.error = false;
      state.message = 'Login successful';
    },
    loginFailed: (state, action) => {
      state.message = action.payload;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLogin = false;
      state.error = false;
      state.message = 'Đăng xuất thành công';
    },
  },
});

export const { loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice;
