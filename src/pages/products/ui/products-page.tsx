import { useEffect } from 'react';
import { ProductTable } from '../../../widgets/product-table';
import { Pagination } from '../../../widgets/pagination';
import { SearchInput } from '../../../features/products/search';
import { useProductStore } from '../../../entities/product';
import type { Product } from '../../../entities/product';

const ITEMS_PER_PAGE = 20;

export const ProductsPage = () => {
  const {
    products,
    total,
    loading,
    error,
    filters,
    loadProducts,
    setFilters,
  } = useProductStore();

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Загрузка при монтировании
  useEffect(() => {
    loadProducts();
  }, []);

  // Загрузка при изменении фильтров
  useEffect(() => {
    loadProducts();
  }, [filters.page, filters.search, filters.sortBy, filters.sortOrder]);

  const handleSort = (key: keyof Product) => {
    const newOrder =
      filters.sortBy === key && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    setFilters({ sortBy: key, sortOrder: newOrder, page: 1 });
  };

  const handleSearch = (value: string) => {
    setFilters({ search: value, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  const handleReload = () => {
    loadProducts();
  };

  const handleEdit = (product: Product) => {
    console.log('Edit product:', product);
  };

  const handleDelete = (id: number) => {
    console.log('Delete product:', id);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-4">
          <SearchInput value={filters.search || ''} onChange={handleSearch} />
        </div>

        <ProductTable
          products={products}
          loading={loading}
          currentSort={
            filters.sortBy ? { key: filters.sortBy, order: filters.sortOrder || 'asc' } : null
          }
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReload={handleReload}
          onAdd={() => {}}
        />

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <Pagination
          currentPage={filters.page || 1}
          totalPages={totalPages}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={total}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};