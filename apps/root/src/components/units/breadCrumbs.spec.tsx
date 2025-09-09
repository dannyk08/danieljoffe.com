import React from 'react';
import { render, screen } from '@testing-library/react';
import BreadCrumbs from './BreadCrumbs';
import { NavLink } from '../assembled/Nav/Links';

// Mock next/navigation usePathname
const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock next/link to use a real anchor and prevent navigation
jest.mock('next/link', () => {
  const React = require('react');
  return React.forwardRef(function MockedNextLink(
    props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string },
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) {
    const { href, children, onClick, ...rest } = props;
    return (
      <a
        ref={ref}
        href={href}
        onClick={e => {
          e.preventDefault();
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </a>
    );
  });
});

describe('BreadCrumbs', () => {
  const items: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/about/team', label: 'Team' },
  ];

  test('renders nav with breadcrumb semantics and all items as links', () => {
    mockUsePathname.mockReturnValue('/about');
    render(<BreadCrumbs items={items} />);
    const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(items.length);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/about');
    expect(links[2]).toHaveAttribute('href', '/about/team');
  });

  test('marks current page item with aria-current', () => {
    mockUsePathname.mockReturnValue('/about/team');
    render(<BreadCrumbs items={items} />);
    const current = screen.getByRole('link', { name: /team/i });
    expect(current).toHaveAttribute('aria-current', 'page');
    const nonCurrent = screen.getByRole('link', { name: /about/i });
    expect(nonCurrent).not.toHaveAttribute('aria-current');
  });

  test('returns null when items is null', () => {
    const { container } = render(
      <BreadCrumbs items={null as unknown as NavLink[]} />
    );
    expect(container.firstChild).toBeNull();
  });
});
