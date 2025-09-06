'use client';
import { ChevronRight } from 'lucide-react';
import { NavLink } from '@/components/assembled/Nav/Links';
import { usePathname } from 'next/navigation';
import Button from '@/components/units/Button';

export default function BreadCrumbs({ items }: { items: NavLink[] }) {
  const pathname = usePathname();

  if (items == null) return null;

  return (
    <div className='flex gap-2 items-center'>
      {items.map((item, index) => (
        <Button
          key={item.href}
          as='link'
          variant='link'
          size='sm'
          href={item.href}
          highlighted={pathname === item.href}
          aria-current={pathname === item.href ? 'page' : undefined}
        >
          {item.label}
          {index !== items.length - 1 && (
            <span className='flex h-full items-center justify-center'>
              <ChevronRight className='w-4 h-4' />
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
