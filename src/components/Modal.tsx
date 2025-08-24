import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/* eslint-disable react/prop-types */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        backdropRef.current &&
        e.target === backdropRef.current &&
        modalRef.current
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);

    const firstFocusable = modalRef.current?.querySelector(
      "button, [href], input, select, textarea",
    );
    if (firstFocusable) (firstFocusable as HTMLElement).focus();

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
