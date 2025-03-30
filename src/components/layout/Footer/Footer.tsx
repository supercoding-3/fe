import { Link, useLocation } from 'react-router-dom';
import { NAV_MENU } from '@/constants/navMenu';
import './footer.scss';

const Footer = () => {
  const location = useLocation();

  return (
    <nav className="nav">
      <ul className="menu">
        {NAV_MENU.map((menu) => (
          <li key={menu.id}>
            <Link
              to={menu.path}
              className={`menu__link ${location.pathname === menu.path ? 'menu__link--active' : ''}`}
            >
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
