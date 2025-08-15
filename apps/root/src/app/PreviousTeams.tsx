import Image from 'next/image';

export default function PreviousTeams() {
  return (
    <div className="container flex flex-col py-14 px-4 self-center">
      <h3 className="text-center">Teams I&apos;ve worked with</h3>
      <div className="flex flex-wrap md:flex-nowrap justify-center pb-4">
        <div className="flex justify-center items-center w-1/2 h-32">
          <Image
            className="w-full h-full max-h-32 max-w-32"
            src="/images/winc-logo.svg"
            alt="Winc"
            width={80}
            height={80}
          />
        </div>
        <div className="flex justify-center items-center w-1/2 h-32">
          <Image
            className="w-full h-full max-h-24 max-w-24"
            src="/images/internet-brands-logo.svg"
            alt="Internet Brands"
            width={96}
            height={80}
          />
        </div>
        <div className="flex justify-center items-center w-1/2 h-32">
          <Image
            className="w-full h-full max-h-24 max-w-24"
            src="/images/the-library-corporation-logo.svg"
            alt="The Library Corporation"
            width={96}
            height={80}
          />
        </div>
        <div className="flex justify-center items-center w-1/2 h-32">
          <Image
            className="w-full h-full max-h-16 max-w-16"
            src="/images/fightcamp-logo.svg"
            alt="FightCamp"
            width={64}
            height={80}
          />
        </div>
      </div>
      <p className="text-center">
        I&apos;ve worked with these companies to build fast, beautiful, and
        inclusive digital experiences.
      </p>
    </div>
  );
}
