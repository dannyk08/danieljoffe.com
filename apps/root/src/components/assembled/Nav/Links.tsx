import Link from 'next/link';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
];

export default function NavLinks({
  pathname,
  handleNavigation,
}: {
  pathname: string;
  handleNavigation?: () => void;
}) {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <ul className="flex flex-col gap-4 md:flex-row">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={
              handleNavigation ??
              (() => {
                return;
              })
            }
            className={`lowercase font-sans font-semibold block transition-colors text-center cursor-pointer ${
              pathname === link.href
                ? 'text-blue-500 underline underline-offset-4'
                : 'text-neutral-800 hover:text-blue-500'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
}
