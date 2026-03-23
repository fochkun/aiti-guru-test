import type { SortField } from '../../../../entities/product/model/types';
import type { SortConfig } from '../model/types';

interface SortHeaderProps {
  column: SortField;
  label: string;
  currentSort: SortConfig | null;
  onSort: (key: SortField) => void;
}

export const SortHeader = ({ column, label, currentSort, onSort }: SortHeaderProps) => {
  const isActive = currentSort?.key === column;
  const order = isActive ? currentSort.order : null;

  return (
    <th
      onClick={() => onSort(column)}
      className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
    >
      <div className="flex items-center gap-2">
        {label}
        {isActive && (
          <span className="text-indigo-600">
            {order === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );
};
