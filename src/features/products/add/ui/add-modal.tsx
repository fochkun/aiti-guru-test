import { useState } from 'react';
import { Modal } from '../../../../shared/ui/modal';
import { Input } from '../../../../shared/ui/input';
import { Button } from '../../../../shared/ui/button';
import { type ProductFormData, RATING_MIN, RATING_MAX } from '../model/types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
}

interface FormErrors {
  title?: string;
  price?: string;
  brand?: string;
  sku?: string;
  rating?: string;
}

export const AddProductModal = ({ isOpen, onClose, onSubmit }: AddProductModalProps) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (data: ProductFormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.title || !data.title.trim()) {
      newErrors.title = 'Наименование обязательно';
    }

    if (!data.price || data.price <= 0) {
      newErrors.price = 'Цена должна быть больше 0';
    }

    if (!data.brand || !data.brand.trim()) {
      newErrors.brand = 'Вендор обязателен';
    }

    if (!data.sku || !data.sku.trim()) {
      newErrors.sku = 'Артикул обязателен';
    }

    if (data.rating === undefined) {
      newErrors.rating = 'Оценка обязательна';
    }

    if (data.rating !== undefined && (data.rating < RATING_MIN || data.rating > RATING_MAX)) {
      newErrors.rating = `Оценка должна быть от ${RATING_MIN} до ${RATING_MAX}`;
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data: ProductFormData = {
      title: formData.get('title') as string,
      price: Number(formData.get('price')),
      brand: formData.get('brand') as string,
      sku: formData.get('sku') as string,
      rating: formData.get('rating') ? Number(formData.get('rating')) : undefined,
    };
    console.log('validete rating', data.rating);

    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(data);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Добавить товар">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input 
          name="title" 
          label="Наименование" 
          placeholder="Введите название" 
          error={errors.title}
          required 
        />
        <Input 
          name="price" 
          label="Цена" 
          type="number" 
          placeholder="0" 
          min="0" 
          step="0.01"
          error={errors.price}
          required 
        />
        <Input 
          name="brand" 
          label="Вендор" 
          placeholder="Введите вендора" 
          error={errors.brand}
          required 
        />
        <Input 
          name="sku" 
          label="Артикул" 
          placeholder="Введите артикул" 
          error={errors.sku}
          required 
        />
        <Input 
          name="rating" 
          label="Рейтинг" 
          type="string"
          placeholder="0-5"
          error={errors.rating}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>Отмена</Button>
          <Button type="submit" variant="primary">Сохранить</Button>
        </div>
      </form>
    </Modal>
  );
};