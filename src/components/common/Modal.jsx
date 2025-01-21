import ReactDOM from 'react-dom';
import PrimaryButton from './PrimaryButton';
import { IoIosClose } from 'react-icons/io';

const Modal = ({ children, onClose, onClick }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <header>
          <button onClick={onClose}>
            <IoIosClose />
          </button>
        </header>
        {children}
        <footer>
          <PrimaryButton
            type="button"
            buttonName="취소"
            onClick={onClose}
            theme="cancel"
          />
          <PrimaryButton
            type="button"
            buttonName="확인"
            onClick={onClick}
            theme="success"
          />
        </footer>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
