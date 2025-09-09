import type React from 'react';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'icon'
  | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonStateInterface {
  enabled?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
}

// Base props shared across variants
export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// Props when rendering as a native <button>
export interface ButtonAsButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'href' | 'target' | 'rel'>,
    BaseButtonProps {
  as?: 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// Props when rendering as a link (<a> via next/link)
export interface ButtonAsLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>,
    BaseButtonProps {
  as: 'link';
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  highlighted?: boolean;
}

// Discriminated union
export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
