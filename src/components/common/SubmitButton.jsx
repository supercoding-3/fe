import '../../scss/components/common/SubmitButton.scss';

const SubmitButton = ({ buttonName }) => {
  return (
    <button type="submit" className="submit-button">
      {buttonName}
    </button>
  );
};

export default SubmitButton;
