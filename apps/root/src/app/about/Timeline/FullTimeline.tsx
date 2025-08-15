import Image from 'next/image';
import timeline from './timeline';

export default function FullTimeline() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="pb-2">{timeline.title}</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {timeline.items.map((item) => (
          <li key={item.company} className="flex flex-col gap-4 ">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center bg-neutral-300 rounded-full p-2 w-12 h-12">
                <Image
                  src={item.logo}
                  alt={item.company}
                  width={40}
                  height={30}
                  className="object-contain max-h-[2rem] max-w-[2rem]"
                />
              </div>
              <h6 className="m-0">
                {item.company} - {item.year}
                <br />
                {item.role}
              </h6>
            </div>
            <div className="flex flex-col border-2 border-neutral-300 p-4 rounded-lg gap-4 h-full">
              <div>
                <h6 className="underline underline-offset-4">Description</h6>
                <p> {item.description}</p>
              </div>
              <div>
                <h6 className="underline underline-offset-4">Challenge</h6>
                <p> {item.challenge}</p>
              </div>
              <div>
                <h6 className="underline underline-offset-4">Solution</h6>
                <p> {item.solution}</p>
              </div>
              <div>
                <h6 className="underline underline-offset-4">Impact</h6>
                <p> {item.impact}</p>
              </div>
              <div>
                <h6 className="underline underline-offset-4">Learned</h6>
                <p> {item.learned}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
