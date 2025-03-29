import { useState } from 'react';
import { Logo } from './Logo';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavMobileList } from './NavMobileList';

export function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex justify-between items-center px-4 py-4">
        <Logo />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-black transition-colors"
          aria-label="Toggle Navigation"
        >
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="h-6 w-6"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && <NavMobileList setIsOpen={setIsOpen} />}
    </div>
  );
}
