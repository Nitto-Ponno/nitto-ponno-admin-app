import { tagTypes } from './../tagType/tagTypes';
import { ApiResponse, Category, TCategory } from '@/types';
import { baseApi } from '../baseApi';

const categories = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation<ApiResponse<TCategory>, Partial<TCategory>>({
      query: (data) => ({
        url: '/category/create',
        method: 'POST',
        data: data,
        tagTypes: tagTypes.category,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    updateCategory: build.mutation<ApiResponse<TCategory>, Partial<TCategory>>({
      query: (data) => ({
        url: `/category/${data._id}`,
        method: 'PATCH',
        data: { name: data.name, description: data.description },
        tagTypes: tagTypes.category,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    getAllCategories: build.query<ApiResponse<TCategory[]>, void>({
      query: () => ({
        url: '/category/get-all',
        method: 'GET',
      }),
      providesTags: [tagTypes.category],
    }),

    getSingleCategory: build.query<ApiResponse<TCategory>, { id: string }>({
      query: ({ id }) => ({
        url: `/category/single/${id}`,
        method: 'GET',
      }),
    }),

    deleteCategory: build.mutation<
      ApiResponse<{ acknowledged: boolean; deletedCount: number }>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useDeleteCategoryMutation,
} = categories;
