import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { GlobalContext, GlobalState } from './Context';
import { useDebouncedWindowResize } from './hooks/windowResize';

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const { windowWidth, windowHeight, isMobile, isTablet, isDesktop } =
    useDebouncedWindowResize();
  const [isModalOpen, _setIsModalOpen] = useState(GlobalState.isModalOpen);
  const [modalContent, _setModalContent] = useState(GlobalState.modalContent);

  const toggleModal = useCallback(() => {
    _setIsModalOpen((open) => !open);
  }, []);

  const setModalContent = useCallback((content: React.ReactNode) => {
    _setIsModalOpen(content !== null);
    _setModalContent(content);
  }, []);

  const value = useMemo(
    () => ({
      isModalOpen,
      toggleModal,
      modalContent,
      setModalContent,
      windowWidth,
      windowHeight,
      isMobile,
      isTablet,
      isDesktop,
    }),
    [
      isModalOpen,
      toggleModal,
      modalContent,
      setModalContent,
      windowWidth,
      windowHeight,
      isMobile,
      isTablet,
      isDesktop,
    ]
  );

  useEffect(() => {
    if (isModalOpen && !isMobile) {
      toggleModal();
    }
    if (isModalOpen) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [isModalOpen, isMobile, toggleModal, isDesktop]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
