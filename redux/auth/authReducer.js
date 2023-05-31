import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    login: null,
    email: null,
    isLoading: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
    }),
    setLoading: (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }),
  },
});
