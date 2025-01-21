import '../../scss/components/common/PrimaryButton.scss';

const PrimaryButton = ({ type, buttonName, isFull = false }) => {
  return (
    <button type={type} className={`primary-button ${isFull ? 'is-full' : ''}`}>
      {buttonName}
    </button>
  );
};

export default PrimaryButton;
