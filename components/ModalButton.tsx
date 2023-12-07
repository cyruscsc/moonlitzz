'use client';

import { modalOpenHandler } from '@/utils/handler';

interface ModalButtonProps {
  forId: string;
  children?: React.ReactNode;
}

const ModalButton = ({ forId, children }: ModalButtonProps) => {
  return (
    <button type='button' onClick={() => modalOpenHandler(forId)}>
      {children}
    </button>
  );
};

export default ModalButton;
