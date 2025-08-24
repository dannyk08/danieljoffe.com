import Image from 'next/image';

export default function TimelineMobile() {
  return (
    <div className='flex md:hidden'>
      <div className='flex flex-1 justify-center items-center'>
        <Image
          src='/images/sm-timeline.svg'
          alt='Timeline Mobile'
          width={375}
          height={667}
        />
      </div>
    </div>
  );
}
