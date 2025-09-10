import { useGlobal } from '@/state/Global/Context';
import Button from '@/components/units/Button';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Dialog = dynamic(
  () => import('@headlessui/react').then(mod => mod.Dialog),
  {
    ssr: false,
  }
);
const DialogBackdrop = dynamic(
  () => import('@headlessui/react').then(mod => mod.DialogBackdrop),
  {
    ssr: false,
  }
);
const DialogPanel = dynamic(
  () => import('@headlessui/react').then(mod => mod.DialogPanel),
  {
    ssr: false,
  }
);

export default function Modal() {
  const { isModalOpen, toggleModal, modalContent } = useGlobal();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    async function handleLoad() {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (isModalOpen && buttonRef.current) {
        buttonRef.current.focus();
      }
    }
    handleLoad();
  }, [isModalOpen, buttonRef]);

  return (
    <Dialog open={isModalOpen} onClose={toggleModal} className='relative z-40'>
      <DialogBackdrop
        transition
        className={[
          'fixed inset-0 bg-neutral-500/75 transition-opacity',
          'data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out',
          'data-leave:duration-200 data-leave:ease-in dark:bg-neutral-900/50',
        ].join(' ')}
      />

      <div className='fixed inset-0 z-41 w-screen overflow-y-auto'>
        <div className='flex min-h-full h-full w-full justify-center items-center'>
          <DialogPanel
            transition
            className={[
              'relative transform overflow-hidden bg-neutral-100 text-left',
              'shadow-xl transition-all data-closed:translate-y-4',
              'data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out',
              'data-leave:duration-200 data-leave:ease-in h-full w-full',
              'data-closed:sm:translate-y-0 data-closed:sm:scale-95 flex flex-col',
              'max-w-[32rem] max-h-[46rem] min-h-full',
            ].join(' ')}
          >
            <main className='bg-neutral-100 flex-1 px-8 py-12 overflow-y-auto'>
              {modalContent}
            </main>
            <footer className='bg-neutral-200/50 px-8 py-4 flex justify-end'>
              <Button onClick={toggleModal} variant='primary' ref={buttonRef}>
                Close
              </Button>
            </footer>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
