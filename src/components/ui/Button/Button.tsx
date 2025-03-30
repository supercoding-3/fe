import './button.scss';

/**
 * 공용 버튼 컴포넌트
 * @param {'primary' | 'disabled'} theme
 * @param {boolean} isFull
 */
const Button = ({
  theme = 'primary',
  isFull = true,
  ...props
}: {
  theme?: 'primary' | 'disabled';
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
