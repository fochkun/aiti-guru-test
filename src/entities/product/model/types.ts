
export enum SortField {
  TITLE = 'title',
  PRICE = 'price',
  RATING = 'rating',
  BRAND = 'brand',
  SKU = 'sku'
}

export type SortOrder = 'asc' | 'desc';
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  search?: string;
  sortBy?: SortField;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}
