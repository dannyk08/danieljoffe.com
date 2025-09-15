'use client';

import GlobalProvider from '@/state/Global/Provider';
import Nav from '@/components/assembled/Nav';
import { TransitionRouter } from 'next-transition-router';
import { startTransition, Suspense, useRef } from 'react';
import ErrorBoundary from '@/components/assembled/ErrorBoundary';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/assembled/Modal'));
const ScrollToElement = dynamic(() => import('./ScrollToElement'));

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <GlobalProvider>
      <TransitionRouter
        auto={true}
        enter={async next => {
          // Use CSS animations instead of GSAP for better performance
          const main = ref.current;
          if (main) {
            main.style.opacity = '0.75';
            main.style.transition = 'opacity 0.3s ease-out';

            requestAnimationFrame(() => {
              main.style.opacity = '1';
              startTransition(next);
            });
          } else {
            startTransition(next);
          }

          // Return cleanup function
          return () => {
            if (main) {
              main.style.transition = '';
            }
          };
        }}
      >
        <Modal />
        <Nav />
        <main
          ref={ref}
          id='main-content'
          role='main'
          className='flex flex-col flex-1 animate-fade-in will-change-opacity'
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Suspense fallback={null}>
          <ScrollToElement />
        </Suspense>
      </TransitionRouter>
    </GlobalProvider>
  );
}
