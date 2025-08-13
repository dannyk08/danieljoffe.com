import { Button } from '@/components/units/Button';
import Blob from './Blob';
import { Fragment } from 'react';
import Image from 'next/image';
import { heroContent } from '@/utils/heroContent';

export default function Index() {
  return (
    <Fragment>
      <div className="h-[50vh] flex flex-col relative -z-1 w-full overflow-hidden flex items-center justify-center md:h-[80vh]">
        <div className="absolute -z-1 flex w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-800 justify-center items-center">
          <Blob />
        </div>
        <div className="container flex flex-col max-w-[750px] px-4 items-center">
          <h2 className="text-shadow-md text-7xl font-bold w-full text-center tracking-wide text-white">
            {heroContent.name}
          </h2>
          <p className="text-shadow-md text-center text-lg text-white">
            {heroContent.tagline}
          </p>
          <Button className="max-w-max mt-4">contact me</Button>
        </div>
      </div>

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
      <div className="container flex flex-col py-14 px-4 self-center">
        <h3 className="text-center">My Achievements</h3>
        <div className="flex flex-col gap-4 py-4">
          {heroContent.achievements.map((achievement, index) => (
            <p key={index} className="flex justify-between gap-4">
              <span className="w-1/6 text-left">{achievement.icon}</span>
              <span className="w-4/6 text-center">{achievement.text}</span>
              <span className="w-1/6 text-right text-sm">
                {achievement.metric}
              </span>
            </p>
          ))}
        </div>
      </div>

      <div className="container flex flex-col py-14 px-4 self-center">
        <h3 className="text-center">My Methodology</h3>
        <div className="flex flex-wrap py-4 justify-between">
          {heroContent.methodology.map((methodology, index) => (
            <div
              key={index}
              className="md:w-1/2 text-center flex flex-col p-4 gap-2 lg:p-8"
            >
              <p className="text-2xl">{methodology.icon}</p>
              <h4 className="text-lg font-bold">{methodology.title}</h4>
              <p>{methodology.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
