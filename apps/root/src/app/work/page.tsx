import Container from '@/components/units/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work Portfolio',
  description:
    "Explore Daniel Joffe's work portfolio and projects. View case studies, technical implementations, and solutions delivered across various industries and technologies.",
  keywords: [
    'Daniel Joffe',
    'Work Portfolio',
    'Projects',
    'Case Studies',
    'Technical Solutions',
    'Web Applications',
    'React Projects',
    'Angular Projects',
    'Full-Stack Development',
  ],
  openGraph: {
    title: 'Daniel Joffe - Work Portfolio & Projects',
    description:
      "Explore Daniel Joffe's work portfolio and projects. View case studies, technical implementations, and solutions delivered across various industries.",
    url: 'https://danieljoffe.com/work',
  },
  twitter: {
    title: 'Daniel Joffe - Work Portfolio & Projects',
    description:
      "Explore Daniel Joffe's work portfolio and projects. View case studies, technical implementations, and solutions delivered across various industries.",
  },
};

export default function Work() {
  return (
    <>
      <Container>
        <h1>Work</h1>
        <p>Portfolio and project showcase coming soon...</p>
      </Container>
    </>
  );
}
