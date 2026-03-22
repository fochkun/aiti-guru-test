import type { Product } from '../../../entities/product/model/types';

interface ProductTableRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductTableRow = ({ product, onEdit, onDelete }: ProductTableRowProps) => {
  const isLowRating = product.rating < 3;

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-900">{product.title}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{product.brand}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{product.sku}</td>
      <td className={`px-4 py-3 text-sm font-medium ${isLowRating ? 'text-red-600' : 'text-gray-900'}`}>
        {product.rating.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{product.price.toFixed(2)} ₽</td>
      <td className="px-4 py-3 text-right text-sm">
        <button onClick={() => onEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-3">
          Редактировать
        </button>
        <button onClick={() => onDelete(product.id)} className="text-red-600 hover:text-red-900">
          Удалить
        </button>
      </td>
    </tr>
  );
};