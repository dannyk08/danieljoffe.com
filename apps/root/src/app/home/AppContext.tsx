'use client';

import GlobalProvider from '@/state/Global/Provider';
import Nav from '@/components/assembled/Nav';
import { TransitionRouter } from 'next-transition-router';
import { startTransition, Suspense } from 'react';
import ErrorBoundary from '@/components/assembled/ErrorBoundary';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/assembled/Modal'));
const ScrollToElement = dynamic(() => import('./ScrollToElement'));

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <TransitionRouter
        auto={true}
        enter={async next => {
          const gsap = (await import('gsap')).gsap;

          const tl = gsap
            .timeline()
            .fromTo(
              'main',
              { opacity: 0.75, duration: 1, ease: 'power2.out' },
              { opacity: 1, duration: 0.75, ease: 'power2.in' }
            )
            .call(
              () => {
                requestAnimationFrame(() => {
                  startTransition(next);
                });
              },
              undefined,
              '<50%'
            );

          return () => tl.kill();
        }}
      >
        <Modal />
        <Nav />
        <main id='main-content' role='main' className='flex flex-col flex-1'>
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Suspense fallback={null}>
          <ScrollToElement />
        </Suspense>
      </TransitionRouter>
    </GlobalProvider>
  );
}
