import { SortHeader } from '../../../features/products/sort/ui/sort-header';
import type { SortConfig } from '../../../features/products/sort/model/types';
import { SortField } from '../../../entities/product/model/types';

interface ProductTableHeaderProps {
  currentSort: SortConfig | null;
  onSort: (key: SortField) => void;
}

export const ProductTableHeader = ({ currentSort, onSort }: ProductTableHeaderProps) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <SortHeader column={SortField.TITLE} label="Наименование" currentSort={currentSort} onSort={onSort} />
        <SortHeader column={SortField.BRAND} label="Вендор" currentSort={currentSort} onSort={onSort} />
        <SortHeader column={SortField.SKU} label="Артикул" currentSort={currentSort} onSort={onSort} />
        <SortHeader column={SortField.RATING} label="Оценка" currentSort={currentSort} onSort={onSort} />
        <SortHeader column={SortField.PRICE} label="Цена, ₽" currentSort={currentSort} onSort={onSort} />
        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700"></th>
      </tr>
    </thead>
  );
};