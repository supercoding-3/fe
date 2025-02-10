import '../../scss/components/common/PrimaryButton.scss';

interface PrimaryButtonProps {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  buttonName: string;
  onClick?: () => void;
  isFull?: boolean;
  theme?: 'primary' | 'success' | 'cancel' | 'disabled';
}

/**
 * 공용 버튼 컴포넌트
 * @param {string} type
 * @param {string} buttonName
 * @param {function} onClick
 * @param {boolean} isFull
 * @param {'primary' | 'success' | 'cancel' | 'disabled'} theme
 */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type,
  buttonName,
  onClick,
  isFull = false,
  theme = 'primary',
}) => {
  return (
    <button
      type={type}
      className={`primary-button ${isFull ? 'is-full' : ''} ${theme}`}
      onClick={onClick}
      disabled={theme === 'disabled'}
    >
      {buttonName}
    </button>
  );
};

export default PrimaryButton;
