import { useEffect, useState } from 'react';
import { ProductTable } from '../../../widgets/product-table';
import { Pagination } from '../../../widgets/pagination';
import { SearchInput } from '../../../features/products/search';
import { useProductStore } from '../../../entities/product';
import { type SortConfig } from '../../../features/products/sort/model/types';
import type { Product } from '../../../entities/product';
import type { SortField } from '../../../entities/product/model/types';
import { AddProductModal } from '../../../features/products/add';
import { EditProductModal } from '../../../features/products/edit';
import type { ProductFormData } from '../../../features/products/add/model/types';
import { toast } from 'sonner';

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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const currentSort: SortConfig | null = filters.sortBy
    ? { key: filters.sortBy, order: filters.sortOrder || 'asc' }
    : null;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [filters.page, filters.search, filters.sortBy, filters.sortOrder, loadProducts]);

  const handleSort = (key: SortField) => {
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
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = (data: ProductFormData) => {
  console.log('Add product:', data);
  toast.success('Товар успешно добавлен', {
    description: `${data.title} (${data.sku})`,
  });
  setIsAddModalOpen(false);
};

  const handleEditSubmit = (data: ProductFormData) => {
  console.log('Edit product:', data);
  toast.success('Товар успешно обновлён', {
    description: `${data.title} (${data.sku})`,
  });
  setIsEditModalOpen(false);
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
          currentSort={currentSort}
          onSort={handleSort}
          onEdit={handleEdit}
          onReload={handleReload}
          onAdd={() => setIsAddModalOpen(true)}
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

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        product={editingProduct || undefined}
      />
    </main>
  );
};