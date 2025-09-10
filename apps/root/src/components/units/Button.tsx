'use client';
import React from 'react';
import Link from 'next/link';
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
import { publicEnv, PublicEnvVars } from '@/lib/public.env';

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

  const commonClassName = classes
    .concat(as === 'link' && restProps.disabled ? 'pointer-events-none' : '')
    .filter(Boolean)
    .join(' ');

  if (as === 'link') {
    const {
      href,
      rel: relIn,
      target,
      highlighted,
      ['aria-current']: ariaCurrent,
      ['aria-label']: ariaLabel,
      id,
      title,
    } = restProps as ButtonAsLinkProps;

    let safeRel = relIn || '';
    if (target === '_blank') {
      const relTokens = new Set(safeRel.split(' ').filter(Boolean));
      relTokens.add('noopener');
      relTokens.add('noreferrer');
      safeRel = Array.from(relTokens).join(' ');
    }

    const linkClasses = [
      commonClassName,
      highlighted ? buttonLinkStyles.highlighted : undefined,
    ]
      .filter(Boolean)
      .join(' ');

    if (restProps.disabled) {
      return (
        <span
          className={linkClasses}
          aria-disabled={true}
          role='link'
          tabIndex={-1}
        >
          {content}
        </span>
      );
    }

    return (
      <Link
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        className={linkClasses}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        rel={safeRel}
        target={target}
        href={href}
        aria-current={ariaCurrent as React.AriaAttributes['aria-current']}
        aria-label={ariaLabel}
        id={id ?? ariaLabel?.replace(' ', '-')}
        title={title}
      >
        {content}
      </Link>
    );
  }

  const {
    type,
    className: _c2,
    ...buttonRest
  } = restProps as ButtonAsButtonProps;

  if (publicEnv[PublicEnvVars.NEXT_PUBLIC_NODE_ENV] !== 'production') {
    if (buttonRest.name == null || buttonRest.name === '') {
      console.warn('Button component: name is required');
    }
  }

  return (
    <button
      {...(buttonRest as Omit<ButtonAsButtonProps, 'type'>)}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={commonClassName}
      disabled={(restProps as ButtonAsButtonProps).disabled}
      type={type || 'button'}
      onClick={
        (restProps as ButtonAsButtonProps).disabled
          ? undefined
          : (onClick as React.MouseEventHandler<HTMLButtonElement>)
      }
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
