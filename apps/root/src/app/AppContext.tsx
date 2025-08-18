'use client';

import Modal from '@/components/assembled/Modal';
import GlobalProvider from '@/state/Global/Provider';
import Nav from '@/components/assembled/Nav';

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <Modal />
      <Nav />
      <div className="flex flex-col flex-1">{children}</div>
    </GlobalProvider>
  );
}
