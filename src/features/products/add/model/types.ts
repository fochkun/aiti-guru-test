import type { Product } from '../../../../entities/product/model/types';

export type ProductFormData = Partial<Product>;

export const REQUIRED_FIELDS: (keyof Product)[] = ['title', 'price', 'brand', 'sku', 'rating'];

export const RATING_MIN = 0;
export const RATING_MAX = 5;