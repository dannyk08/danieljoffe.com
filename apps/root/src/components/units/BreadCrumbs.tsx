'use client';
import { Link } from 'next-transition-router';
import { ChevronRight } from 'lucide-react';
import { NavLink } from '@/components/assembled/Nav/Links';
import { usePathname } from 'next/navigation';

export default function BreadCrumbs({ items }: { items: NavLink[] }) {
  const pathname = usePathname();

  if (items == null) return null;

  return (
    <div className='flex gap-2 items-center'>
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={[
            'flex items-center hover:text-blue-500',
            'font-sans font-semibold',
            pathname === item.href ? 'text-blue-500 underline underline-offset-4' : '',
          ].join(' ')}
          aria-current={pathname === item.href ? 'page' : undefined}
        >
          <span>{item.label}</span>
          {index !== items.length - 1 && <ChevronRight />}
        </Link>
      ))}
    </div>
  );
}
