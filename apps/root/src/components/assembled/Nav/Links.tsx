import { useDebouncedWindowResize } from "@/utils/hooks/windowResize";
import { mobileMenuVariants, mobileMenuItemVariants } from "@/utils/motionVariants";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Links ({ pathname }: { pathname: string })  {
    const { width } = useDebouncedWindowResize();
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      setIsMobile(width < 768);
    }, [width]);
  
    return (
      <motion.ul
        className="flex flex-col items-center gap-2 md:gap-8 md:flex-row"
        variants={isMobile ? mobileMenuVariants : {}}
        initial="closed"
        animate="open"
        exit="closed"
        >
        {NAV_LINKS.map((link) => (
          <motion.li
            key={link.href}
            variants={mobileMenuItemVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <Link
              href={link.href}
              className={`text-sm lowercase font-sans font-bold block transition-colors ${
                pathname === link.href
                  ? 'text-neutral-900 underline'
                  : 'text-neutral-200 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    );
  };