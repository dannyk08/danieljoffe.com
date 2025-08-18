import Image from 'next/image';

export default function TimelineTU() {
  return (
    <div className="hidden md:flex">
      <div className="flex flex-1 justify-center items-center">
        <Image
          src="/images/md-timeline.svg"
          alt="Timeline TU"
          width={768}
          height={1024}
        />
      </div>
    </div>
  );
}
