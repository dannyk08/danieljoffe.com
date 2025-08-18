'use client';

import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';
import { useGlobal } from '@/state/Global/Context';
import NavLinks from './Links';

export default function Nav() {
  const pathname = usePathname();
  const { isModalOpen, setModalContent } = useGlobal();

  const handleLinkClick = () => {
    setModalContent(
      <NavLinks
        pathname={pathname}
        handleNavigation={() => setModalContent(null)}
      />
    );
  };

  return (
    <nav className="w-full fixed top-0 z-30 md:z-auto md:bg-white">
      <div className="hidden md:flex w-full justify-center items-center py-4 px-8">
        {/* <Logo /> */}
        <NavLinks pathname={pathname} />
      </div>

      <MobileNav menuOpen={isModalOpen} setMenuOpen={handleLinkClick} />
    </nav>
  );
}
