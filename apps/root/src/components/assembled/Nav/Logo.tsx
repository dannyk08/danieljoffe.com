import Image from 'next/image';
import { HOME_LINK } from '@/components/assembled/Nav/Links';
import { JOB_TITLE, FULL_NAME } from '@/utils/constants';
import Button from '@/components/units/Button';

export default function Logo() {
  return (
    <Button
      as='link'
      variant='link'
      size='sm'
      href={HOME_LINK.href}
      aria-label={HOME_LINK.label}
    >
      <Image
        src='/icon-w-name.svg'
        alt={`${FULL_NAME} - ${JOB_TITLE}`}
        width={124}
        height={24}
        loading='eager'
        className='h-6 w-auto sm:h-7 md:h-8'
        sizes='(max-width: 640px) 6rem, (max-width: 768px) 7rem, 8rem'
        priority={true}
        fetchPriority='high'
        unoptimized={true}
      />
    </Button>
  );
}
