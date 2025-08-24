import Image from 'next/image';

export default function TimelineTU() {
  return (
    <div className='hidden md:flex'>
      <div className='flex flex-1 justify-center items-center'>
        <Image
          src='/images/md-timeline.svg'
          alt='Timeline TU'
          width={768}
          height={1024}
          className='w-full h-auto max-w-2xl lg:max-w-4xl'
          sizes='(min-width: 768px) 50vw, (min-width: 1024px) 33vw'
        />
      </div>
    </div>
  );
}
