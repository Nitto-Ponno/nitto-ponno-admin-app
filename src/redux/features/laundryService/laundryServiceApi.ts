import { baseApi } from '@/redux/api/baseApi';
import { ILaundryService } from '@/types/laundryservice';

const laundryServiceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createService: build.mutation({
      query: (data: Partial<ILaundryService>) => ({
        url: '/laundryService',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useCreateServiceMutation } = laundryServiceApi;
