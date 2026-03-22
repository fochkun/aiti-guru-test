import { Modal } from '../../../../shared/ui';
import { Input } from '../../../../shared/ui';
import { Button } from '../../../../shared/ui';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  product?: any;
}

export const EditProductModal = ({ isOpen, onClose, onSubmit, product }: EditProductModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактировать товар">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit({}); }}>
        <Input name="title" label="Наименование" defaultValue={product?.title} />
        <Input name="price" label="Цена" type="number" defaultValue={product?.price} />
        <Input name="brand" label="Вендор" defaultValue={product?.brand} />
        <Input name="sku" label="Артикул" defaultValue={product?.sku} />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="primary">Сохранить</Button>
        </div>
      </form>
    </Modal>
  );
};