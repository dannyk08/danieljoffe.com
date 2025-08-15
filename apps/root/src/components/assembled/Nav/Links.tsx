import { useDebouncedWindowResize } from "@/utils/hooks/windowResize";
import { mobileMenuVariants, mobileMenuItemVariants } from "@/utils/motionVariants";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
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
              className={`lowercase font-sans font-semibold block transition-colors ${
                pathname === link.href
                  ? 'text-blue-500 underline underline-offset-4'
                  : 'text-neutral-800 hover:text-blue-500'
              }`}
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    );
  };