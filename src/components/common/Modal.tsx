import { IoIosClose } from 'react-icons/io';
import ReactDOM from 'react-dom';
import '@/scss/components/common/Modal.scss';
import PrimaryButton from '@/components/common/PrimaryButton';
import { ModalProps } from '@/types/Modal';

const Modal: React.FC<ModalProps> = ({ children, onClose, onClick }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <header className="modal__header">
          <button onClick={onClose} className="modal__header--close">
            <IoIosClose />
          </button>
        </header>
        {children}
        <footer className="modal__footer">
          {onClose && (
            <PrimaryButton
              type="button"
              buttonName="취소"
              onClick={onClose}
              theme="cancel"
            />
          )}
          {onClick && (
            <PrimaryButton
              type="button"
              buttonName="확인"
              onClick={onClick}
              theme="success"
            />
          )}
        </footer>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
