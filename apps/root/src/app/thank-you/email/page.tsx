import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  buttonBaseStyles,
  buttonSizeStyles,
  buttonVariantStyles,
} from '@/components/units/Button';
import Container from '@/components/units/Container';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You - Message Received',
  description: 'Thank you for reaching out to Daniel Joffe. Your message has been received and I\'ll get back to you as soon as possible.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Thank You - Message Received',
    description: 'Thank you for reaching out to Daniel Joffe. Your message has been received and I\'ll get back to you as soon as possible.',
    url: 'https://danieljoffe.com/thank-you/email',
  },
  twitter: {
    title: 'Thank You - Message Received',
    description: 'Thank you for reaching out to Daniel Joffe. Your message has been received and I\'ll get back to you as soon as possible.',
  },
};

const allowedReferers = ['/about'];
const newUrl = '/';

export default async function ThankYouEmail() {
  const referer = (await headers()).get('referer');
  if (!referer || !allowedReferers.includes(new URL(referer).pathname)) {
    redirect(newUrl);
  }

  return (
    <Container>
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Thank you for reaching out!
          </h1>
          <p className="text-lg text-center mb-2">
            I appreciate you taking the time to reach out.
            <br />
            I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <Link
          className={[
            buttonBaseStyles,
            buttonVariantStyles.secondary,
            buttonSizeStyles.md,
          ].join(' ')}
          href={newUrl}
        >
          Back to home
        </Link>
      </div>
    </Container>
  );
}
