import { UnsplashImageMeta } from '@/components/assembled/UnsplashImage';

export type ExperienceItem = {
  id: string;
  year: string;
  company: string;
  logo: string;
  role: string;
  description: string;
  challenge: string[];
  solution: string;
  impact: string;
  learned: string;
  cover: UnsplashImageMeta;
};

export const winc: ExperienceItem = {
  id: 'winc',
  year: '2015-2017',
  company: 'WINC (formerly ClubW)',
  logo: '/images/winc-logo.svg',
  role: 'Frontend Developer',
  description: 'The Foundation Years: Learning to Scale Marketing Operations',
  challenge: [
    'I began my career at a wine subscription startup during a pivotal transformation period. ClubW was rebranding to Winc, and I found myself at the center of both technical and brand evolution challenges.',
    'Marketing was bottlenecked by engineering. Creating campaign landing pages required developer intervention for every single page, limiting the team to just 3 pages per week. Meanwhile, we were undergoing a complete brand transformation that demanded seamless user experience continuity.',
  ],
  solution:
    "I developed a custom, self-serve landing page CMS using Angular 2, which was a relatively cutting-edge technology at the time. This wasn't just a technical project; it was about empowering an entire team to move at the speed of business.",
  impact:
    'Marketing launched 200+ campaign pages within two months of the CMS launch. I also orchestrated the technical aspects of the ClubW to Winc rebrand, ensuring zero user friction during the transition while simultaneously leading our AngularJS to Angular 2 migration for improved framework stability.',
  learned:
    'The power of eliminating bottlenecks through smart tooling, and how technical solutions can directly accelerate business growth.',
  cover: {
    src: 'https://images.unsplash.com/photo-1558138818-d44c4dea7a6a?q=80&w=2671&auto=format&fit=crop',
    alt: 'Forground of vineyards with a sunset shining on the mountains in the background',
    origin:
      'https://unsplash.com/photos/long-exposure-photography-of-road-and-cars-NqOInJ-ttqM',
    creator: '@marcojodoin',
  },
};

export const internetBrands: ExperienceItem = {
  id: 'internet-brands',
  year: '2018-2019',
  company: 'Internet Brands',
  logo: '/images/internet-brands-logo.svg',
  role: 'Frontend Developer',
  description: 'The Leadership Test: Managing Teams While Ensuring Compliance',
  challenge: [
    "Moving to Internet Brands' Health vertical meant entering the complex world of healthcare applications, where technical excellence had to meet strict regulatory requirements.",
    'I was thrust into senior-level responsibilities despite my title, leading a team of 5 developers (3 junior, 2 mid-level) while ensuring HIPAA compliance across clinical office applications. The company also needed to fill a critical Senior Developer role that had been vacant.',
  ],
  solution:
    'I took ownership of both people and process. I drove HIPAA compliance research and implementation, led the hiring process for 30+ Junior, Mid-Level, and Senior Developer candidates, and built a shared React component library that unified our microservices UI.',
  impact:
    'We achieved full application launch within one month through streamlined development processes. I successfully hired the key Senior Developer we needed, refactored an unstable Angular 2+ application, and repaired our CI pipeline to ensure reliable deployments.',
  learned:
    "Leadership isn't about titles. It's about taking responsibility for outcomes. I discovered my ability to manage both technical architecture and team dynamics simultaneously.",
  cover: {
    src: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=2532&auto=format&fit=crop',
    alt: 'Overexposed traffic lights in a city at night',
    origin:
      'https://unsplash.com/photos/plants-and-mountains-during-golden-hour-N1c4X5csoTg',
    creator: '@timmossholder',
  },
};

export const theLibraryCorporation: ExperienceItem = {
  id: 'the-library-corporation',
  year: '2019-2021',
  company: 'The Library Corporation',
  logo: '/images/the-library-corporation-logo.svg',
  role: 'Software Engineer',
  description: 'The Specialization Challenge: Building for Unique User Needs',
  challenge: [
    'Transitioning to library software meant understanding an entirely different user base: librarians managing cataloging workflows across school and public libraries nationwide.',
    "Library cataloging is incredibly specialized work. I needed to build features that enhanced complex workflows for subject matter experts I'd never worked with before, all while ensuring accessibility compliance for diverse library patrons.",
  ],
  solution:
    'I became a student of the domain, collaborating closely with QA teams, backend engineers, and library cataloging SMEs. I built 30+ features in AngularJS while focusing on scalability and accessibility.',
  impact:
    'I achieved full WCAG compliance by researching, diagnosing, and remediating accessibility violations across our legacy Spring application. My dynamic cataloging components increased both accuracy and flexibility for diverse asset types.',
  learned:
    'The importance of domain expertise and user-centered design. Technical skills mean nothing without deep understanding of user needs and regulatory requirements.',
  cover: {
    src: 'https://images.unsplash.com/photo-1465929639680-64ee080eb3ed?q=80&w=2670&auto=format&fit=crop',
    alt: 'An 1800s library with tall bookshelves and large overhead windows',
    origin: 'https://unsplash.com/photos/photo-of-library-hall-dsvJgiBJTOs',
    creator: '@willvanw',
  },
};

export const fightcamp: ExperienceItem = {
  id: 'fightcamp',
  year: '2021-2023',
  company: 'FightCamp',
  logo: '/images/fightcamp-logo.svg',
  role: 'Full-Stack Engineer',
  description: 'The Scale Challenge: Infrastructure for Exponential Growth',
  challenge: [
    'FightCamp was experiencing explosive growth, and I arrived just as the technical infrastructure needed to evolve to match business demands.',
    'The platform was buckling under exponential user growth. Mobile performance was suffering (10-second load times), the team lacked development standards, and non-technical teams were overly dependent on engineering for basic tasks.',
  ],
  solution:
    'I led a comprehensive infrastructure optimization initiative, established development guidelines for the growing engineering team, and built tools that empowered other departments to work independently.',
  impact:
    "I reduced mobile website load times from 10 seconds to ~2 seconds, boosting Lighthouse mobile scores by 40+ points. I created an A/B testing component for Marketing and extended our UI component library with Storybook, ultimately reducing Content team's developer dependency by 90%.",
  learned:
    'How to think infrastructure-first and the multiplier effect of empowering other teams through smart technical solutions.',
  cover: {
    src: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=2670&auto=format&fit=crop',
    alt: 'A woman wearing black boxing gloves in boxing stance in a gym',
    origin:
      'https://unsplash.com/photos/woman-in-orange-and-black-shirt-and-black-leggings-doing-exercise-ZUBNPRZsQvk',
    creator: '@visualsbyroyalz',
  },
};

export const professionalDevelopment: ExperienceItem = {
  id: 'professional-development',
  year: '2023-Present',
  company: 'Professional Development & Contract Work',
  logo: '/images/brand-logo.svg',
  role: 'Full-Stack Engineer',
  description: 'The Investment Phase: Deepening Expertise While Contributing',
  challenge: [
    'Rather than immediately jumping to the next full-time role, I made the strategic decision to strengthen my computer science foundation while staying engaged with meaningful projects.',
    "Balancing formal education with professional growth, while proving that stepping back doesn't mean stepping down.",
  ],
  solution:
    "I enrolled in a Bachelor's program in Computer Science while accepting a contracted engineering project from a former CEO—building frontend dashboards for a new Logistics and Operations venture.",
  impact:
    "I'm gaining both theoretical depth and practical experience simultaneously, demonstrating that continuous learning and professional contribution can coexist.",
  learned:
    'A long-term investment mindset. Sometimes the best career move is to strengthen your foundation while maintaining professional relationships that value your expertise.',
  cover: {
    src: 'https://images.unsplash.com/photo-1645886702268-a28bf146bc35?q=80&w=2675&auto=format&fit=crop',
    alt: 'A man in a green shirt and jeans looking at his laptop sitting at a cafe counter',
    origin:
      'https://unsplash.com/photos/a-man-sitting-at-a-table-using-a-laptop-computer-CBlCcF-dyGM',
    creator: '@emmaou',
  },
};

export const experience: Record<string, ExperienceItem> = {
  [winc.id]: winc,
  [internetBrands.id]: internetBrands,
  [theLibraryCorporation.id]: theLibraryCorporation,
  [fightcamp.id]: fightcamp,
  [professionalDevelopment.id]: professionalDevelopment,
};
