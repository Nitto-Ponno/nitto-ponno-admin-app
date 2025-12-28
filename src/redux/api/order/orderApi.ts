import { OrderStatus, PaymentMethod, PaymentStatus } from '@/types/order.types';
import { baseApi } from '../baseApi';
import { tagTypes } from '../tagType/tagTypes';

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<
      any,
      {
        page?: number;
        limit?: number;
        search?: string;
        status?: OrderStatus;
        paymentMethod?: PaymentMethod;
        paymentStatus?: PaymentStatus;
      }
    >({
      query: ({
        page,
        limit,
        search,
        status,
        paymentMethod,
        paymentStatus,
      }) => ({
        url: '/orders',
        method: 'GET',
        params: {
          page: page || 1,
          limit: limit || 15,
          search,
          status,
          paymentMethod,
          paymentStatus,
        },
      }),
      providesTags: [tagTypes.order],
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
