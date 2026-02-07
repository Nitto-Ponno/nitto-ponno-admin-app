import { baseApi } from '../baseApi';

const laundryService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllServices: build.query({
      query: () => ({
        url: '/laundryService',
        method: 'GET',
      }),
    }),
    updateLaundryService: build.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/laundryService/:${id}`,
        method: 'PATCH',
        data,
      }),
    }),
  }),
});

export const { useGetAllServicesQuery, useUpdateLaundryServiceMutation } =
  laundryService;
