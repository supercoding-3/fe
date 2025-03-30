import { MdError } from 'react-icons/md';
import './error.scss';

const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="error">
      <MdError />
      <p>{errorMessage}</p>
      <p>잠시 후 다시 시도해주세요</p>
    </div>
  );
};

export default Error;
