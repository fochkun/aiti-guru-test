import { useState } from 'react';
import { Modal } from '../../../../shared';
import { Input } from '../../../../shared';
import { Button } from '../../../../shared';
import { type ProductFormData, RATING_MIN, RATING_MAX } from '../../add/model/types';
import type { Product } from '../../../../entities/product/model/types';

interface FormErrors {
  title?: string;
  price?: string;
  brand?: string;
  sku?: string;
  rating?: string;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  product?: Product;
}

export const EditProductModal = ({ isOpen, onClose, onSubmit, product }: EditProductModalProps) => {
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

    if (data.rating === undefined || data.rating === null) {
      newErrors.rating = 'Оценка обязательна';
    } else if (data.rating < RATING_MIN || data.rating > RATING_MAX) {
      newErrors.rating = `Рейтинг должен быть от ${RATING_MIN} до ${RATING_MAX}`;
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const ratingValue = formData.get('rating') as string;
    
    const data: ProductFormData = {
      title: formData.get('title') as string,
      price: Number(formData.get('price')),
      brand: formData.get('brand') as string,
      sku: formData.get('sku') as string,
      rating: ratingValue ? Number(ratingValue) : undefined,
    };

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
    <Modal isOpen={isOpen} onClose={handleClose} title="Редактировать товар">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input 
          name="title" 
          label="Наименование" 
          defaultValue={product?.title} 
          error={errors.title}
          required 
        />
        <Input 
          name="price" 
          label="Цена" 
          type="number" 
          defaultValue={product?.price} 
          min="0" 
          step="0.01"
          error={errors.price}
          required 
        />
        <Input 
          name="brand" 
          label="Вендор" 
          defaultValue={product?.brand} 
          error={errors.brand}
          required 
        />
        <Input 
          name="sku" 
          label="Артикул" 
          defaultValue={product?.sku} 
          error={errors.sku}
          required 
        />
        <Input 
          name="rating" 
          label="Рейтинг" 
          type="string" 
          defaultValue={product?.rating}
          error={errors.rating}
          required 
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose}>Отмена</Button>
          <Button type="submit" variant="primary">Сохранить</Button>
        </div>
      </form>
    </Modal>
  );
};