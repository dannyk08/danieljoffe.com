import Container from '@/components/units/Container';
import Image from 'next/image';

export default function PreviousTeams() {
  return (
    <Container>
      <h2 className="text-center">Teams I&apos;ve worked with</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-8 justify-items-center items-center pb-4">
        <div className="flex justify-center items-center h-[5rem] w-full">
          <Image
            className="w-full h-full max-h-[3.5rem] max-w-[6.5rem]"
            src="/images/winc-logo.svg"
            alt="Winc"
            width={250}
            height={80}
          />
        </div>
        <div className="flex justify-center items-center h-[5rem] w-full">
          <Image
            className="w-full h-full max-h-[3.5rem] max-w-[6.5rem]"
            src="/images/internet-brands-logo.svg"
            alt="Internet Brands"
            width={210}
            height={80}
          />
        </div>
        <div className="flex justify-center items-center h-[5rem] w-full">
          <Image
            className="w-full h-full max-h-[3.5rem] max-w-[6.5rem]"
            src="/images/the-library-corporation-logo.svg"
            alt="The Library Corporation"
            width={210}
            height={80}
          />
        </div>
        <div className="flex justify-center items-center h-[5rem] w-full">
          <Image
            className="w-full h-full max-h-[3.5rem] max-w-[6.5rem]"
            src="/images/fightcamp-logo.svg"
            alt="FightCamp"
            width={80}
            height={80}
          />
        </div>
      </div>
      <p className="text-center">
        I&apos;ve worked with these companies to build fast, beautiful, and
        inclusive digital experiences.
      </p>
    </Container>
  );
}
