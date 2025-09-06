'use client';
import React, { lazy } from 'react';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'icon' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStateInterface {
  enabled?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
}

// Base props that all button variants share
interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// Props for when rendering as a button
interface ButtonAsButtonProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-disabled'?: boolean;
  as?: 'button';
}

// Props for when rendering as a Next.js Link
interface ButtonAsLinkProps extends BaseButtonProps {
  as: 'link';
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  highlighted?: boolean;
}

// Union type for all possible button props
type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Link = lazy<typeof import('next/link').default>(() => {
  return new Promise((resolve, reject) => {
    import('next/link')
      .then(module => resolve({ default: module.default || module }))
      .catch(reject);
  });
});

export const buttonBaseStyles = [
  'flex inline-flex items-center justify-center',
  'font-sans font-bold border-transparent rounded',
  'transition-colors duration-400 ease-in-out',
  'focus:outline-none focus-visible:ring-2',
  'focus-visible:ring-offset-2 border-2',
  'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:border-neutral-200',
].join(' ');

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  default: 'bg-transparent',
  primary: [
    'bg-blue-500 text-white',
    'hover:bg-blue-600 active:border-blue-900',
    'focus-visible:ring-blue-500 ',
  ].join(' '),
  secondary: [
    'bg-neutral-100 border-neutral-200 text-neutral-900',
    'hover:border-neutral-600',
    'active:bg-neutral-200 active:border-neutral-600',
    'focus-visible:ring-neutral-600',
  ].join(' '),
  icon: [
    'border-neutral-100 p-2 rounded-full',
    'hover:border-neutral-200 active:border-neutral-400',
    'focus-visible:ring-neutral-200',
    'p-2 w-10 h-10 min-w-[1.25rem]',
  ].join(' '),
  link: [
    'hover:text-blue-600 hover:underline hover:underline-offset-4',
    'active:text-blue-700',
  ].join(' '),
};

export const buttonStateStyles: Record<keyof ButtonStateInterface, string> = {
  enabled: 'cursor-pointer hover:cursor-pointer',
  disabled: 'cursor-not-allowed opacity-60 hover:cursor-not-allowed',
  highlighted: '',
};

export const buttonLinkStyles: Record<keyof ButtonStateInterface, string> = {
  ...buttonStateStyles,
  highlighted: 'text-blue-500 underline underline-offset-4',
};

export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base p-2 h-min-8',
  lg: 'text-lg p-3 h-min-10',
};

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    children,
    as = 'button',
    onClick,
    ...restProps
  } = props;
  const classes = [
    buttonBaseStyles,
    buttonVariantStyles[variant],
    buttonSizeStyles[size],
    restProps.disabled ? buttonStateStyles.disabled : buttonStateStyles.enabled,
    restProps.className,
  ];

  const content = (
    <span className='min-h-[1.25rem] flex h-full w-full'>{children}</span>
  );

  const isLinkValid = as === 'link' && !restProps.disabled;

  let { href, rel, target } = restProps as ButtonAsLinkProps;
  const { highlighted, ...bareProps } = {
    href,
    rel,
    target,
    ...restProps,
  } as ButtonAsLinkProps;

  href = isLinkValid ? (restProps as ButtonAsLinkProps).href || '' : '';
  rel = isLinkValid ? (restProps as ButtonAsLinkProps).rel || '' : '';
  target = isLinkValid ? (restProps as ButtonAsLinkProps).target || '' : '';

  if (isLinkValid && highlighted) {
    classes.push(buttonLinkStyles.highlighted);
  }

  const _props = {
    ...bareProps,
    ref: ref as React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
    className: classes.filter(Boolean).join(' '),
    'aria-disabled': bareProps.disabled || false,
    onClick: bareProps.disabled ? undefined : onClick,
  };

  if (as === 'link') {
    return (
      <Link
        {...(_props as unknown as Omit<
          ButtonAsLinkProps,
          'href' | 'rel' | 'target'
        >)}
        rel={rel}
        target={target}
        href={href}
      >
        {content}
      </Link>
    );
  }

  if ('href' in _props && _props.href !== undefined) {
    throw new Error(
      'The "href" prop is not allowed when rendering a <button>. Use as="link" for links.'
    );
  }

  return (
    <button {...(_props as unknown as ButtonAsButtonProps)}>{content}</button>
  );
});

Button.displayName = 'Button';
export default Button;
