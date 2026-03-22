import { useState } from 'react';
import { ProductTable } from '../../../widgets/product-table';
import { Pagination } from '../../../widgets/pagination';
import { SearchInput } from '../../../features/products/search';
import { EditProductModal } from '../../../features/products/edit';
import type { Product } from '../../../entities/product/model/types';
import { AddProductModal } from '../../../features/products/add';

const ITEMS_PER_PAGE = 20;

export const ProductsPage = () => {
  const [products] = useState<Product[]>([]);
  const [loading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState<{ key: keyof Product; order: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems] = useState(120);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleSort = (key: keyof Product) => {
    setCurrentSort(prev => ({
      key,
      order: prev?.key === key && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log('Delete product:', id);
  };

  const handleReload = () => {
    console.log('Reload products');
    // Здесь будет вызов API
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (data: any) => {
    console.log('Add product:', data);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (data: any) => {
    console.log('Edit product:', data);
    setIsEditModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Товары</h1>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <ProductTable
          products={products}
          loading={loading}
          currentSort={currentSort}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReload={handleReload}
          onAdd={handleAdd}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
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