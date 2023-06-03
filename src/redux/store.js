import { configureStore } from '@reduxjs/toolkit';
import authReduce from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReduce.reducer,
  },
});

export default store;
