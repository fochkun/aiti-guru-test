import { Loader } from '../../../shared/ui/loader';
import { ProductTableHeader } from './product-table-header';
import { ProductTableRow } from './product-table-row';
import type { Product } from '../../../entities/product/model/types';
import { AddProductButton } from '../../../features/products/add';
import { ReloadButton } from '../../../shared/ui/reload-button';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  currentSort: { key: keyof Product; order: 'asc' | 'desc' } | null;
  onSort: (key: keyof Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onReload: () => void;
  onAdd: () => void;
}

export const ProductTable = ({ 
  products, 
  loading, 
  currentSort, 
  onSort,
  onEdit,
  onDelete,
  onReload,
  onAdd
}: ProductTableProps) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow">
      <div className="flex items-center justify-between py-4 px-4">
        <h2 className="text-lg font-semibold text-gray-900">Все позиции</h2>
        <div className="flex gap-2">
          <ReloadButton onClick={onReload} />
          <AddProductButton onClick={onAdd} />
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <ProductTableHeader currentSort={currentSort} onSort={onSort} />
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          Товары не найдены
        </div>
      )}
    </div>
  );
};