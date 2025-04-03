import { FaCircleInfo } from 'react-icons/fa6';
import './empty-state.scss';

const EmptyState = ({ message = '목록이 없습니다' }) => {
  return (
    <div className="empty-state">
      <FaCircleInfo />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
