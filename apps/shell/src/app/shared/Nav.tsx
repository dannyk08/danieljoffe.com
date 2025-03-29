import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { NavMobile } from './NavMobile';
import { navLinks } from './NavMobileList';

export function Nav() {
  return (
    <nav className="w-full bg-white">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
        <Logo />

        <div className="flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-600 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <NavMobile />
    </nav>
  );
}
