import { api } from '../../../shared/api/base';
import type { ProductsResponse, ProductFilters } from '../model/types';

export const productApi = {
  getProducts: async (filters: ProductFilters): Promise<ProductsResponse> => {
    const params = new URLSearchParams({
      limit: String(filters.limit || 20),
      skip: String(((filters.page || 1) - 1) * (filters.limit || 20)),
    });

    if (filters.search) {
      params.append('q', filters.search);
    }

    if (filters.sortBy) {
      params.append('sortBy', filters.sortBy);
      params.append('order', filters.sortOrder || 'asc');
    }

    return api.private.get<ProductsResponse>(`/products?${params}`);
  },
};