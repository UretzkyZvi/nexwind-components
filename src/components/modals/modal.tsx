import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  description,
}) => {
  if (!isOpen) {
    return null;
  }

  // Function to close modal on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      {/* Background backdrop */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Modal panel */}
        <div
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-screen-xl     sm:p-6"
          style={{
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          <div className="bg-white pb-4 sm:pb-4">
            <div className="flex flex-row  justify-between">
              <div className="flex flex-col">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900 sm:text-left"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="ml-auto flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-50"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="mt-4 w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
