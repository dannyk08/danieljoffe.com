import Image from 'next/image';
import timeline from './timeline';
import Link from 'next/link';
import LinkHint from '@/components/units/LinkHint';

export default function FullTimeline() {
  return (
    <div className='flex flex-col gap-4' id={timeline.id}>
      <h3 className='pb-2'>{timeline.title}</h3>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {timeline.items.map(item => (
          <li key={item.company} className='flex flex-col gap-4 '>
            <Link
              className='flex items-center gap-4 hover:underline underline-offset-4'
              href={`/about/experience/${item.id}`}
              aria-label={`View details for ${item.company}`}
            >
              <div className='flex items-center justify-center bg-neutral-200 rounded-full p-2 w-12 h-12 sm:w-14 sm:h-14 relative'>
                <Image
                  src={item.logo}
                  alt={item.company}
                  width={48}
                  height={48}
                  sizes='(max-width: 640px) 3rem, 3.5rem'
                />
              </div>
              <h4 className='flex-1 m-0 h6'>
                {item.company} - {item.year}
                <br />
                {item.role}
              </h4>
              <LinkHint />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
