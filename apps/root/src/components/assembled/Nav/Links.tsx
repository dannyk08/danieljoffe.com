import Link from 'next/link';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
];

export default function NavLinks({
  pathname,
  handleClick,
}: {
  pathname: string;
  handleClick?: () => void;
}) {
  const handleLinkClick = () => {
    setTimeout(() => {
      handleClick?.();
    }, 150);
  };

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <ul className="flex flex-col gap-4 md:flex-row">
        {NAV_LINKS.map((link) => (
          <li key={link.href} className="flex items-center">
            <Link
              href={link.href}
              onClick={handleLinkClick}
              className={`lowercase font-sans font-semibold block transition-colors text-center cursor-pointer ${
                pathname === link.href
                  ? 'text-blue-500 underline underline-offset-4'
                  : 'text-neutral-900 hover:text-blue-500'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
