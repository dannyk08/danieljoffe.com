import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href='/' aria-label='Daniel Joffe - Home'>
      <Image
        src='/icon-w-name.svg'
        alt='Daniel Joffe - Full-Stack Engineer'
        width={124}
        height={24}
        loading='eager'
        className='h-6 w-auto sm:h-7 md:h-8'
        sizes='(max-width: 640px) 6rem, (max-width: 768px) 7rem, 8rem'
      />
    </Link>
  );
}
