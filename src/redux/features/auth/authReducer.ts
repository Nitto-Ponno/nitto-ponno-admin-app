import { TUser } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type TInitialState = {
  user: TUser | null;
  isAuthenticated: boolean;
};

const initialState: TInitialState = {
  user: null,
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      console.log({ state, action });
      state.user = action.payload;
      state.isAuthenticated = true;
      Cookies.set(
        process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME as string,
        action.payload.accessToken,
      );
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME as string);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
