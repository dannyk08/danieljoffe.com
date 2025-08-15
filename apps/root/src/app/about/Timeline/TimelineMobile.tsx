import Image from 'next/image';

export default function TimelineMobile() {
  return (
    <div className="md:hidden">
      <div className="flex justify-center items-center">
        <Image
          src="/images/sm-timeline.svg"
          alt="Timeline Mobile"
          width={375}
          height={667}
        />
      </div>
    </div>
  );
}
