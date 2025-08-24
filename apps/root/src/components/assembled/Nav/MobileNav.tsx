import { motion } from 'motion/react';
import Logo from './Logo';

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
      <motion.button
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls='mobile-menu'
        className='focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded'
        onClick={setMenuOpen}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className='w-7 h-7 text-neutral-900'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
          role='img'
        >
          {menuOpen ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 8h16M4 16h16'
            />
          )}
        </svg>
      </motion.button>
    </div>
  );
}
