import './header.scss';

const Header = ({ ...props }) => {
  return <header className="header">{props.children}</header>;
};

export default Header;
