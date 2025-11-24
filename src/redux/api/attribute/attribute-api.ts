import { tagTypes } from './../tagType/tagTypes';
import { ApiResponse, TAttribute } from '@/types';
import { baseApi } from '../baseApi';

const attribute = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAttribute: build.mutation<
      ApiResponse<TAttribute>,
      Partial<TAttribute>
    >({
      query: (data) => ({
        url: '/laundryAttribute',
        method: 'POST',
        data: data,
        tagTypes: tagTypes.attribute,
      }),
      invalidatesTags: [tagTypes.attribute],
    }),

    updateAttribute: build.mutation<
      ApiResponse<TAttribute>,
      Partial<TAttribute>
    >({
      query: (data) => ({
        url: `/category/${data._id}`,
        method: 'PATCH',
        data: { name: data.name, description: data.description },
        tagTypes: tagTypes.attribute,
      }),
      invalidatesTags: [tagTypes.attribute],
    }),

    getAllAttribute: build.query<ApiResponse<TAttribute[]>, void>({
      query: () => ({
        url: '/laundryAttribute',
        method: 'GET',
      }),
      providesTags: [tagTypes.attribute],
    }),

    getSingleAttribute: build.query<ApiResponse<TAttribute>, { id: string }>({
      query: ({ id }) => ({
        url: `/category/single/${id}`,
        method: 'GET',
      }),
    }),

    deleteAttribute: build.mutation<
      ApiResponse<{ acknowledged: boolean; deletedCount: number }>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.attribute],
    }),
  }),
});

export const { useCreateAttributeMutation, useGetAllAttributeQuery } =
  attribute;
