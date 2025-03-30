import { Link } from 'react-router-dom';
import { NAV_MENU } from '@/constants/navMenu';
import './footer.scss';

const Footer = () => {
  return (
    <nav className="nav">
      <ul className="menu">
        {NAV_MENU.map((menu) => (
          <li key={menu.id}>
            <Link to={menu.path} className="menu__link">
              <menu.icon />
              <p> {menu.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Footer;
