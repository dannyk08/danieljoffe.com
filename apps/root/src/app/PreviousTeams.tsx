import Container from '@/components/units/Container';
import Image from 'next/image';
import Link from 'next/link';
import {
  fightcamp,
  internetBrands,
  theLibraryCorporation,
  winc,
} from '@/app/about/experience/[slug]/experience';
import LinkHint from '@/components/units/LinkHint';

const companies = [winc, internetBrands, theLibraryCorporation, fightcamp];

export default function PreviousTeams() {
  return (
    <Container>
      <h2 className='text-center'>Teams I&apos;ve worked with</h2>
      <div className='grid grid-cols-2 grid-rows-2 gap-8 justify-items-center items-center pb-4 min-h-[12.5rem]'>
        {companies.map(company => (
          <Link
            key={company.id}
            href={`/about/experience/${company.id}`}
            aria-label={company.company}
            title={company.company}
            className='relative flex justify-center items-center hover:underline underline-offset-4 min-h-[3.5rem] w-full max-w-[8rem]'
          >
            <Image
              className='w-full h-full max-h-[3.5rem] object-contain'
              src={company.logo}
              alt={company.company}
              width={145}
              height={45}
              sizes='(max-width: 640px) 5rem, (max-width: 768px) 6rem, 7rem'
            />
            <LinkHint />
          </Link>
        ))}
      </div>

      <p className='text-center'>
        I&apos;ve worked with these companies to build fast, beautiful, and
        inclusive digital experiences.
      </p>
    </Container>
  );
}
