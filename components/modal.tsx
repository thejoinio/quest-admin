import Image from 'next/image';
import React, { FC, useRef, useEffect, useCallback } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  // Close modal on 'Escape' key press
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleClickOutside, handleEscapeKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center bg-[#04061DB2] transition-opacity font-(family-name:--font-tsb)">
      <div
        ref={modalRef}
        className="modal-bg rounded-[20px] p-4 w-full max-w-[738px] h-fit mx-auto transform transition-transform scale-[0.7] sm:scale-75 md:scale-100 z-[51]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 scale-125 hover:scale-100 active:scale-125 cursor-pointer"
        >
          <Image src={'/cancel.svg'} alt="Cancel" width={20} height={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;