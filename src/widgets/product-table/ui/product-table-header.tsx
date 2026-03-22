import { SortHeader } from '../../../features/products/sort/ui/sort-header';
import type { Product } from '../../../entities/product/model/types';

interface ProductTableHeaderProps {
  currentSort: { key: keyof Product; order: 'asc' | 'desc' } | null;
  onSort: (key: keyof Product) => void;
}

export const ProductTableHeader = ({ currentSort, onSort }: ProductTableHeaderProps) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <SortHeader column="title" label="Наименование" currentSort={currentSort} onSort={onSort} />
        <SortHeader column="brand" label="Вендор" currentSort={currentSort} onSort={onSort} />
        <SortHeader column="sku" label="Артикул" currentSort={currentSort} onSort={onSort} />
        <SortHeader column="rating" label="Оценка" currentSort={currentSort} onSort={onSort} />
        <SortHeader column="price" label="Цена, ₽" currentSort={currentSort} onSort={onSort} />
        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700"></th>
      </tr>
    </thead>
  );
};