import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" aria-label="Daniel Joffe - Home">
      <Image
        src="/icon-w-name.svg"
        alt="Daniel Joffe - Full-Stack Engineer"
        width="124"
        height="24"
        loading="eager"
        className="aspect-auto"
      />
    </Link>
  );
}
