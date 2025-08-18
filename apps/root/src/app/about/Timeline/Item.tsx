import Image from 'next/image';
import timeline from './timeline';

export default function TimelineItem({
  item,
}: {
  item: (typeof timeline.items)[0];
}) {
  return (
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
        <h6 className="m-0 flex-1">
          {item.company}
          <br />
          {item.year}
          <br />
          {item.role}
        </h6>
      </div>
      <div className="flex flex-col gap-4 h-full">
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
  );
}
