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
    refreshToken: build.query({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation } = authAPi;
