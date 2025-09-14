import { useGlobal } from '@/state/Global/Context';
import Button from '@/components/units/Button';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useFocusTrap } from '@/hooks/useFocusTrap';

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
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const focusTrapRef = useFocusTrap(isModalOpen);

  useEffect(() => {
    if (isModalOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      if (previousActiveElement.current) {
        previousActiveElement.current.setAttribute(
          'data-previously-focused',
          'true'
        );
      }

      // Focus the close button after a short delay
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
      }, 100);
    } else {
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current.removeAttribute(
          'data-previously-focused'
        );
        previousActiveElement.current = null;
      }
    }
  }, [isModalOpen]);

  return (
    <Dialog
      open={isModalOpen}
      onClose={toggleModal}
      className='relative z-40'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
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
            ref={focusTrapRef}
            transition
            className={[
              'relative transform overflow-hidden bg-neutral-100 text-left',
              'shadow-xl transition-all data-closed:translate-y-4',
              'data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out',
              'data-leave:duration-200 data-leave:ease-in h-full w-full',
              'data-closed:sm:translate-y-0 data-closed:sm:scale-95 flex flex-col',
              'max-w-[32rem] max-h-[46rem] min-h-full',
            ].join(' ')}
            role='dialog'
            aria-modal='true'
          >
            <header className='sr-only'>
              <h2 id='modal-title'>Navigation Menu</h2>
              <p id='modal-description'>
                Use the menu below to navigate to different sections of the
                website.
              </p>
            </header>
            <main className='bg-neutral-100 flex-1 px-8 py-12 overflow-y-auto'>
              {modalContent}
            </main>
            <footer className='bg-neutral-200/50 px-8 py-4 flex justify-end'>
              <Button
                onClick={toggleModal}
                variant='primary'
                ref={buttonRef}
                aria-label='Close navigation menu'
                name='close-navigation-menu'
              >
                Close
              </Button>
            </footer>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
