import { Variants } from 'motion';

// Mobile navigation variants
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.25,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const mobileMenuItemVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.9,
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};
