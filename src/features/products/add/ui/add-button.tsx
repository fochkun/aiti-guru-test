import { Button } from '../../../../shared';

interface AddProductButtonProps {
  onClick: () => void;
}

export const AddProductButton = ({ onClick }: AddProductButtonProps) => {
  return (
    <Button onClick={onClick} variant="primary" size="md">
      + Добавить
    </Button>
  );
};