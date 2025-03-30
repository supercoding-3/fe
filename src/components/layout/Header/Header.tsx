import { MdMenu } from 'react-icons/md';
import { Input } from '@/components/ui';
import './header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__input">
        <Input type="text" placeholder="검색어를 입력하세요" />
      </div>
      <button className="header__menu-button">
        <MdMenu />
      </button>
    </div>
  );
};

export default Header;
