import ReactDOM from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import './alert.scss';

const Alert = ({
  show,
  setShow,
  children,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const alertRoot = document.getElementById('alert');

  if (!alertRoot) return null;

  return ReactDOM.createPortal(
    <div className={`alert ${show ? 'alert--show' : ''}`}>
      <header className="alert__header">
        <button onClick={() => setShow(false)}>
          <IoMdClose />
        </button>
      </header>
      {children}
    </div>,
    alertRoot
  );
};

export default Alert;
