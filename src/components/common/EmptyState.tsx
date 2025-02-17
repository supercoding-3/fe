import { FaRegSadCry } from 'react-icons/fa';
import '@/scss/components/common/EmptyState.scss';

const EmptyState = ({ message = '앗! 아무것도 없어요!' }) => {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        <FaRegSadCry />
      </span>
      <p className="empty-state__message">{message}</p>
    </div>
  );
};

export default EmptyState;
