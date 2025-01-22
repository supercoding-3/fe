import '../../scss/components/common/PrimaryButton.scss';

/**
 * 공용 버튼 컴포넌트
 * @param {string} type
 * @param {string} buttonName
 * @param {function} onClick
 * @param {boolean} isFull
 * @param {'primary' | 'success' | 'cancel' | 'disabled'} theme
 */
const PrimaryButton = ({
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
