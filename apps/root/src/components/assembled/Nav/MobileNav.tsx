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
    <div className="md:hidden flex items-center justify-between w-full py-4 px-4 bg-white shadow">
      <Logo />
      <motion.button
        aria-label="Open menu"
        className="focus:outline-none"
        onClick={setMenuOpen}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="w-7 h-7 text-neutral-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          )}
        </svg>
      </motion.button>
    </div>
  );
}
