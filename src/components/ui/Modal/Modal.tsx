import ReactDOM from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import './modal.scss';

const Modal = ({
  show,
  setShow,
  children,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const modalRoot = document.getElementById('modal');

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={`modal ${show ? 'modal--show' : ''}`}>
      <header className="modal__header">
        <button onClick={() => setShow(false)}>
          <IoMdClose />
        </button>
      </header>
      {children}
    </div>,
    modalRoot
  );
};

export default Modal;
