import { Modal } from '../../../../shared/ui';
import { Input } from '../../../../shared/ui';
import { Button } from '../../../../shared/ui';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const AddProductModal = ({ isOpen, onClose, onSubmit }: AddProductModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавить товар">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit({}); }}>
        <Input name="title" label="Наименование" placeholder="Введите название" />
        <Input name="price" label="Цена" type="number" placeholder="0" />
        <Input name="brand" label="Вендор" placeholder="Введите вендора" />
        <Input name="sku" label="Артикул" placeholder="Введите артикул" />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="primary">Сохранить</Button>
        </div>
      </form>
    </Modal>
  );
};