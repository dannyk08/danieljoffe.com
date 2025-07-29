import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/icon-w-name.svg"
        alt="Logo"
        width="124"
        height="24"
        loading="eager"
        className="aspect-auto"
      />
    </Link>
  );
}
