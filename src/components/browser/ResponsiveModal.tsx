import Modal from "../modals/modal";

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[60dvh] md:h-[50dvh] lg:h-[40dvh] rounded-lg border-2 border-black">
        {children}
      </div>
    </Modal>
  );
};

export default ResponsiveModal;
