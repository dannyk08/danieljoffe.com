'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Links from './Links';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import MobileNav from './MobileNav';

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="w-full md:fixed top-0 z-30 md:z-auto md:bg-transparent relative z-1">
      <div className="hidden md:flex w-full justify-center items-center py-4 px-8">
        {/* <Logo /> */}
        <Links pathname={pathname} />
      </div>

      <MobileNav
        menuOpen={menuOpen}
        setMenuOpen={() => setMenuOpen((open) => !open)}
      />
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        pathname={pathname}
      />
    </nav>
  );
}
