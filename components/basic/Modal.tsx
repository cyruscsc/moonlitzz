import { ReactNode } from 'react';

interface ModalProps {
  id: string;
  title?: string;
  children?: ReactNode;
  className?: string;
}

const Modal = ({ id, title, children, className }: ModalProps) => {
  return (
    <dialog id={id} className='modal'>
      <div className={`modal-box ${className || ''}`}>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <h3 className='font-bold text-lg mb-2'>{title}</h3>
        {children}
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
