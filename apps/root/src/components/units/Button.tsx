import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStateInterface {
  disabled: boolean;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  className?: string;
}

export const buttonBaseStyles = [
  'flex inline-flex items-center justify-center',
  'rounded transition-colors',
  'focus:outline-none focus-visible:ring-2',
  'focus-visible:ring-offset-2 focus-visible:ring-blue-400',
  'font-sans items-baseline hover:cursor-pointer',
].join(' ');

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary: [
    'border-2 border-transparent bg-neutral-100 hover:bg-blue-600 hover:text-white',
    'text-neutral-900 active:bg-blue-700 active:text-white',
    'font-bold focus-visible:ring-blue-500',
    'disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-neutral-300',
  ].join(' '),
  secondary: [
    'border-2 bg-neutral-100 border border-neutral-300 text-neutral-900',
    'hover:bg-blue-600 hover:text-white',
    'active:bg-blue-700 active:text-white',
    'font-bold focus-visible:ring-neutral-300',
    'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:border-neutral-300',
  ].join(' '),
  icon: [
    'p-2 bg-transparent rounded-full',
    'hover:bg-neutral-300/50 active:bg-neutral-400/50',
    'focus-visible:ring-neutral-300',
    'disabled:text-neutral-300 disabled:bg-transparent',
    'p-2 w-10 h-10 justify-center min-w-[1.25rem]',
  ].join(' '),
};

export const buttonStateStyles: Record<keyof ButtonStateInterface, string> = {
  disabled: 'cursor-not-allowed opacity-60',
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
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={[
        buttonBaseStyles,
        buttonVariantStyles[variant],
        buttonSizeStyles[size],
        disabled ? buttonStateStyles.disabled : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      <span className='min-h-[1.25rem] flex items-center justify-center'>
        {children}
      </span>
    </button>
  )
);

Button.displayName = 'Button';
