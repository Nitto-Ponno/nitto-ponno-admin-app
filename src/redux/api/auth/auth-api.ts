import { TSignupUser } from '@/types';
import { baseApi } from '../baseApi';

const authAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => ({
        overrideExisting: true,
        url: '/auth/admin-login',
        method: 'POST',
        data: data,
        headers: {},
      }),
    }),
    signupUser: build.mutation({
      query: (data: TSignupUser) => ({
        overrideExisting: true,
        url: '/auth/customer-register',
        method: 'POST',
        data: data,
        headers: {},
      }),
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        data: data,
        headers: {},
      }),
    }),
    refreshToken: build.query({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useForgetPasswordMutation,
  useSignupUserMutation,
} = authAPi;
