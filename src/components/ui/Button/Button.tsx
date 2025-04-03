import './button.scss';

const Button = ({
  theme = 'primary',
  isFull = true,
  ...props
}: {
  theme?: 'primary' | 'secondary' | 'disabled';
  isFull?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`button button--${theme}  ${isFull ? 'button--full' : ''}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
