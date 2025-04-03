import './form-error.scss';

const FormError = ({ ...props }) => {
  return <p className="form-error">{props.children}</p>;
};
export default FormError;
