import Container from '@/components/units/Container';
import Image from 'next/image';

export default function Hero() {
  return (
    <Container>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1>About</h1>
          <div className="flex justify-center">
            <Image
              src="/images/daniel-joffe-profile.png"
              alt="Daniel Joffe"
              width={300}
              height={300}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Hello, I&apos;m Daniel Joffe,</p>
          <p>
            I&apos;m a full-stack engineer with 8+ years of experience building
            scalable solutions that drive real business impact. Currently,
            I&apos;m strengthening my computer science foundation through formal
            education while taking on strategic engineering projects, because I
            believe in never stopping the pursuit of growth.
          </p>
        </div>
      </div>
    </Container>
  );
}
