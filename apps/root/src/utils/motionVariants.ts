import { Variants } from 'motion';

// Mobile navigation variants
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.25,
    transition: {
      delay: 0.125,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0, 0.71, 0.2, 1.01],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const mobileMenuItemVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
};
