import { AnimatePresence, motion } from 'motion/react';
import { mobileMenuVariants } from '@/utils/motionVariants';
import Links from './Links';

export default function MobileMenu({
  menuOpen,
  setMenuOpen,
  pathname,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10 md:hidden"
          variants={mobileMenuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <motion.button
            aria-label="Close menu"
            className="absolute top-4 right-4 text-neutral-600"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
          <Links pathname={pathname} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
