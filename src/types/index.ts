export * from '@/types/product.types';
export * from '@/types/auth/auth-types';
export * from '@/types/category.type';

export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  pagination: any[];
};
