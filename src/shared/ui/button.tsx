import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded-md font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' && 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500',
        variant === 'secondary' && 'bg-gray-600 hover:bg-gray-500 focus:ring-gray-500',
        variant === 'danger' && 'bg-red-600 hover:bg-red-500 focus:ring-red-500',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
