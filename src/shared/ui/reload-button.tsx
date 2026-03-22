import { Button } from '.';

interface ReloadProductsButtonProps {
  onClick: () => void;
}

export const ReloadButton = ({ onClick }: ReloadProductsButtonProps) => {
  return (
    <Button onClick={onClick} variant="primary" size="md">
      Обновить
    </Button>
  );
};