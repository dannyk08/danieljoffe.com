'use client';
import Image from 'next/image';
import timeline from './timeline';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function FullTimeline() {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='pb-2'>{timeline.title}</h3>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {timeline.items.map(item => (
          <li key={item.company} className='flex flex-col gap-4 '>
            <Link
              className='flex items-center gap-4 hover:underline underline-offset-4'
              href={`/about/experience/${item.id}`}
              aria-label={`View details for ${item.company}`}
            >
              <div className='flex items-center justify-center bg-neutral-200 rounded-full p-2 w-14 h-14'>
                <Image
                  src={item.logo}
                  alt={item.company}
                  width={40}
                  height={30}
                  className='object-contain max-h-[2rem] max-w-[2rem]'
                />
              </div>
              <h4 className='flex-1 m-0 h6'>
                {item.company} - {item.year}
                <br />
                {item.role}
              </h4>

              <div className='flex items-center justify-center min-w-8'>
                <ArrowUpRightIcon className='w-4 h-4' />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
