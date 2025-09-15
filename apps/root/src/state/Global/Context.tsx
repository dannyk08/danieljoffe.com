'use client';

import { WindowSizeInterface } from '@/hooks/windowResize';
import { createContext, useContext } from 'react';

export type ModalInterface = {
  isModalOpen: boolean;
  toggleModal: () => void;
  modalContent: React.ReactNode | null;
  setModalContent: (content: React.ReactNode) => void;
};

export type GlobalContextValue = WindowSizeInterface & ModalInterface & {};

export const GlobalState: GlobalContextValue = {
  windowWidth: 400,
  windowHeight: 600,
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  isModalOpen: false,
  toggleModal: () => {
    return;
  },
  modalContent: null,
  setModalContent: () => {
    return;
  },
};

export const GlobalContext = createContext<GlobalContextValue>(GlobalState);

export function useGlobal(): GlobalContextValue {
  return useContext(GlobalContext);
}
