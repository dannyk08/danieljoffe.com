'use client';
import React, { lazy } from 'react';
import {
  ButtonAsButtonProps,
  ButtonAsLinkProps,
  ButtonProps,
} from './button.types';
import {
  buttonBaseStyles,
  buttonVariantStyles,
  buttonSizeStyles,
  buttonStateStyles,
  buttonLinkStyles,
} from './button.constants';

const Link = lazy<typeof import('next/link').default>(() => {
  return new Promise((resolve, reject) => {
    async function loadLink() {
      await import('next/link')
        .then(module => resolve({ default: module.default || module }))
        .catch(reject);
    }
    loadLink();
  });
});

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
