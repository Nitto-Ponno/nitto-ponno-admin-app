import { TUser } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

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
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
