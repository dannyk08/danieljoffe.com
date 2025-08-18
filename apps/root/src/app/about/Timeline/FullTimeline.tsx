'use client';
import Image from 'next/image';
import timeline from './timeline';
import { useGlobal } from '@/state/Global/Context';
import { ArrowUpRightIcon } from 'lucide-react';
import TimelineItem from './Item';

export default function FullTimeline() {
  const { setModalContent } = useGlobal();
  return (
    <div className="flex flex-col gap-4">
      <h3 className="pb-2">{timeline.title}</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {timeline.items.map((item) => (
          <li key={item.company} className="flex flex-col gap-4 ">
            <div
              className="flex items-center gap-4"
              onClick={() => setModalContent(<TimelineItem item={item} />)}
              aria-label={`View details for ${item.company}`}
            >
              <div className="flex items-center justify-center bg-neutral-300 rounded-full p-2 w-12 h-12">
                <Image
                  src={item.logo}
                  alt={item.company}
                  width={40}
                  height={30}
                  className="object-contain max-h-[2rem] max-w-[2rem]"
                />
              </div>
              <h6 className="flex-1 m-0">
                {item.company} - {item.year}
                <br />
                {item.role}
              </h6>

              <div className="flex items-center justify-center min-w-8">
                <ArrowUpRightIcon className="w-4 h-4" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
