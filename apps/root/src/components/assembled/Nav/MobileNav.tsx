import { Menu, XIcon } from 'lucide-react';
import Logo from './Logo';
import Button from '@/components/units/Button';

export default function MobileNav({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: () => void;
}) {
  return (
    <div className='md:hidden flex items-center justify-between w-full py-4 px-4 bg-neutral-100 shadow'>
      <Logo />
      <Button
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls='mobile-menu'
        onClick={setMenuOpen}
        variant='icon'
        name='toggle menu'
      >
        {menuOpen ? <XIcon /> : <Menu />}
      </Button>
    </div>
  );
}
