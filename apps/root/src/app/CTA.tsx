import { Button } from '@/components/units/Button';
import Container from '@/components/units/Container';

export default function CTA() {
  return (
    <Container className="bg-neutral-800 text-white">
      <div className="flex flex-col max-w-[32rem] items-center self-center text-center gap-4">
        <h2>Let&apos;s Build Something Great Together</h2>
        <p>
          Ready to discuss how I can help drive your team&apos;s success?
          I&apos;m always excited to tackle new challenges and create meaningful
          impact.
        </p>
        <div className="flex gap-4">
          <Button>View my work</Button>
          <Button>Get in touch</Button>
        </div>
      </div>
    </Container>
  );
}
