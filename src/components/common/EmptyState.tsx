import { FaRegFaceGrinBeamSweat } from 'react-icons/fa6';
import '@/scss/components/common/EmptyState.scss';

const EmptyState = ({ message = '결과가 없습니다' }) => {
  return (
    <div className="empty-state">
      <FaRegFaceGrinBeamSweat />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
