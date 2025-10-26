export interface ProductPrice {
  originalPrice: number;
  price: number;
  discount: number;
}

export interface Category {
  _id: string;
  name: {
    en: string;
    [key: string]: string; // For other language codes
  };
}

export interface ProductVariant {
  [key: string]: string | number; // Dynamic variant attribute IDs
  price: number | string;
  originalPrice: string;
  quantity: number;
  discount: string;
  productId: string;
  barcode: string;
  sku?: string | any;
  image: string;
}

export interface ProductTitle {
  en: string;
  pt?: string;
  hi?: string;
  ur?: string;
  ar?: string;
  de?: string;
  bn?: string;
}

export interface ProductDescription {
  en: string;
  pt?: string;
  hi?: string;
  ur?: string;
  ar?: string;
  de?: string;
  bn?: string;
}

export interface Product {
  _id: string;
  productId: string;
  title: ProductTitle;
  slug: string;
  sku: string;
  barcode: string;
  prices: ProductPrice;
  categories: Category[];
  category: Category;
  image: string[];
  tag: string[];
  variants: ProductVariant[];
  isCombination: boolean;
  status: 'show' | 'hide';
  stock: number;
  description: ProductDescription;
  sales: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
