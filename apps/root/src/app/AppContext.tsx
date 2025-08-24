'use client';

import { gsap } from 'gsap';
import Modal from '@/components/assembled/Modal';
import GlobalProvider from '@/state/Global/Provider';
import Nav from '@/components/assembled/Nav';
import { TransitionRouter } from 'next-transition-router';
import { startTransition } from 'react';

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <TransitionRouter
        auto={true}
        enter={(next) => {
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
        <main id="main-content" role="main" className="flex flex-col flex-1">
          {children}
        </main>
      </TransitionRouter>
    </GlobalProvider>
  );
}
