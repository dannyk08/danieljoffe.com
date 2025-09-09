import Container from '@/components/units/Container';
import Image from 'next/image';
import {
  fightcamp,
  internetBrands,
  theLibraryCorporation,
  winc,
} from '@/app/about/experience/[slug]/experience';
import LinkHint from '@/components/units/LinkHint';
import { ABOUT_LINK } from '@/components/assembled/Nav/Links';
import Button from '@/components/units/Button';

const companies = [winc, internetBrands, theLibraryCorporation, fightcamp];

export default function PreviousTeams() {
  return (
    <Container>
      <h2 className='text-center'>Teams I&apos;ve worked with</h2>
      <div className='grid grid-cols-2 grid-rows-2 gap-8 justify-items-center items-center pb-4 min-h-[12.5rem]'>
        {companies.map(company => (
          <Button
            key={company.id}
            as='link'
            variant='link'
            size='lg'
            href={`${ABOUT_LINK.href}/experience/${company.id}`}
            aria-label={company.company}
            title={company.company}
          >
            <div className='flex gap-2 w-full h-full items-center justify-center'>
              <Image
                className='w-full h-full max-w-[10rem] max-h-[5rem] object-contain flex-1'
                src={company.logo}
                alt={company.company}
                width={145}
                height={45}
                sizes='(max-width: 640px) 5rem, (max-width: 768px) 6rem, 7rem'
              />
              <LinkHint />
            </div>
          </Button>
        ))}
      </div>

      <p className='text-center'>
        I&apos;ve worked with these companies to build fast, beautiful, and
        inclusive digital experiences.
      </p>
    </Container>
  );
}
