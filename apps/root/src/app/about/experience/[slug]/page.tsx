import Container from '@/components/units/Container';
import { experience } from './experience';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = experience[slug as keyof typeof experience];

  if (!item) {
    return redirect('/about');
  }

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center bg-neutral-200 rounded-full p-2 w-[6rem] h-[6rem]">
            <Image
              src={item.logo}
              alt={item.company}
              width={60}
              height={35}
              className="object-contain h-full w-full max-h-[4rem] max-w-[4rem]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="h2 m-0">{item?.company}</h1>
          <h2 className="m-0 flex-1 h4">
            {item.year}
            <br />
            {item.role}
          </h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 h-full">
          <div>
            <h3 className="h4">{item.description}</h3>
          </div>
          <div>
            <h3 className="h5">The Challenge</h3>
            <p> {item.challenge}</p>
          </div>
          <div>
            <h3 className="h5">The Solution</h3>
            <p> {item.solution}</p>
          </div>
          <div>
            <h3 className="h5">The Impact</h3>
            <p> {item.impact}</p>
          </div>
          <div>
            <h3 className="h5">Lessons Learned</h3>
            <p> {item.learned}</p>
          </div>
        </div>

        {/* create link that inherits the button styles */}
      </div>
    </Container>
  );
}
