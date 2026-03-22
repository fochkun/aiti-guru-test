import { create } from 'zustand';
import { productApi } from '../api/product.api';
import type { Product, ProductFilters } from './types';

interface ProductState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
}

interface ProductActions {
  loadProducts: () => Promise<void>;
  setFilters: (filters: Partial<ProductFilters>) => void;
}

type ProductStore = ProductState & ProductActions;

const initialState: ProductState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  filters: {
    page: 1,
    limit: 20,
    search: '',
    sortBy: undefined,
    sortOrder: 'asc',
  },
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,

  loadProducts: async () => {
    set({ loading: true, error: null });

    try {
      const { filters } = get();
      const response = await productApi.getProducts(filters);
      
      set({
        products: response.products,
        total: response.total,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Не удалось загрузить товары',
        loading: false,
      });
    }
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
  },
}));