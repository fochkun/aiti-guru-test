type SortKey = 'title' | 'price' | 'rating' | 'brand';
type SortOrder = 'asc' | 'desc';

interface SortHeaderProps {
  column: SortKey;
  label: string;
  currentSort: { key: SortKey; order: SortOrder } | null;
  onSort: (key: SortKey) => void;
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
            {order === 'asc' ? 'в†‘' : 'в†“'}
          </span>
        )}
      </div>
    </th>
  );
};
