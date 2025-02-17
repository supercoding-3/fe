import { Link } from 'react-router-dom';
import { MenuItem } from '@/types/Menu';

interface DropdownMenuProps {
  menuList: MenuItem[];
  closeDropdown: () => void;
}

const DropdownMenu = ({ menuList, closeDropdown }: DropdownMenuProps) => {
  return (
    <div className="header__dropdown">
      <ul className="header__dropdown-list">
        {menuList.map((item, i) => (
          <li key={i} className="header__dropdown-item">
            {item.isLink ? (
              <Link to={item.path} onClick={closeDropdown}>
                {item.label}
              </Link>
            ) : (
              <button
                onClick={() => {
                  if (item.onClick) item.onClick();
                  closeDropdown();
                }}
                className="header__dropdown-logout"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
