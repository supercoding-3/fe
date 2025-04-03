import './input.scss';

const Input = ({ ...props }) => {
  return <input className="input" autoComplete="off" {...props} />;
};

export default Input;
