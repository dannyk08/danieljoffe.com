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

// Base props that all button variants share
export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// Props for when rendering as a button
export interface ButtonAsButtonProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-disabled'?: boolean;
  as?: 'button';
}

// Props for when rendering as a Next.js Link
export interface ButtonAsLinkProps extends BaseButtonProps {
  as: 'link';
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  highlighted?: boolean;
}

// Union type for all possible button props
export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
