import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const buttonBaseStyles =
  'flex inline-flex items-center justify-center font-semibold rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 font-sans items-baseline';

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus-visible:ring-blue-500 disabled:bg-blue-200 disabled:text-blue-400',
  secondary:
    'bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200',
  icon: 'p-2 bg-transparent text-blue-500 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 disabled:text-gray-300 disabled:bg-transparent',
};

export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 h-8',
  md: 'text-base px-4 py-2 h-10',
  lg: 'text-lg px-5 py-3 h-12',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      children,
      icon,
      className = '',
      ...props
    },
    ref
  ) => {
    const isIconOnly = variant === 'icon' && !children && icon;
    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={[
          buttonBaseStyles,
          buttonVariantStyles[variant],
          buttonSizeStyles[size],
          isIconOnly ? 'p-2 w-10 h-10 justify-center' : '',
          disabled ? 'cursor-not-allowed opacity-60' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled}
        {...props}
      >
        {icon && (
          <span
            className={
              children
                ? 'mr-2 flex-shrink-0 flex items-center'
                : 'flex items-center justify-center w-full h-full'
            }
            aria-hidden={children ? 'true' : undefined}
          >
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
