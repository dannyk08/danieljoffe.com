import Blob from './Blob';

export default function Index() {
  return (
    <div className="h-[50vh] flex flex-col relative w-full overflow-hidden flex items-center justify-center md:h-[80vh]">
      <div className="absolute -z-1 flex w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-800">
        <Blob />
      </div>
      <div className="container flex flex-col max-w-[500px] mx-auto px-4">
        <h2 className="text-shadow-md text-7xl font-bold w-full text-center lowercase tracking-wider text-white">
          Daniel Joffe
        </h2>
        <p className="text-center text-lg text-white">
          Building modern, performant, and accessible web applications.
        </p>
      </div>
    </div>
  );
}
