import { heroContent } from '@/utils/heroContent';
import { Button } from '@/components/units/Button';
import Blob from './Blob';

export default function Hero() {
  return (
    <div className="h-[50vh] flex flex-col relative w-full overflow-hidden flex items-center justify-center md:h-[80vh]">
      <div className="absolute -z-1 flex w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-800 justify-center items-center">
        <Blob />
      </div>
      <div className="container flex flex-col max-w-[750px] px-4 items-center">
        <h1 className="text-shadow-md text-7xl w-full text-center tracking-wide text-white">
          {heroContent.name}
        </h1>
        <p className="text-shadow-md text-center text-lg text-white">
          {heroContent.tagline}
        </p>
        <Button className="max-w-max mt-4">contact me</Button>
      </div>
    </div>
  );
}
