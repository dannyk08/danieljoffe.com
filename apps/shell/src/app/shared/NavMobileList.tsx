import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

interface NavMobileProps {
  setIsOpen: (boolean: boolean) => void;
}

export const navLinks = [
  { path: '/about', label: 'about' },
  { path: '/projects', label: 'projects' },
  { path: '/contact', label: 'contact' },
];

export function NavMobileList({ setIsOpen }: NavMobileProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-black transition-colors"
      >
        <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
      </button>
      <div className="flex flex-col items-center gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-gray-800 hover:text-black transition-colors font-heading-five"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
