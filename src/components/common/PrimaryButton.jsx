import '../../scss/components/common/PrimaryButton.scss';

const PrimaryButton = ({ type, buttonName }) => {
  return (
    <button type={type} className="primary-button is-full">
      {buttonName}
    </button>
  );
};

export default PrimaryButton;
