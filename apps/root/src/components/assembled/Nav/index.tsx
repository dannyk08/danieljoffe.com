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
    <nav className="w-full sticky top-0 z-30 md:static md:z-auto">
      <div className="hidden md:flex w-full justify-between items-center py-4 px-8 bg-white shadow">
        <Logo />
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
