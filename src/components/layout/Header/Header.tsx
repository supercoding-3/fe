import { Input } from '@/components/ui';
import './header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__input">
        <Input type="text" placeholder="검색어를 입력하세요" />
      </div>
    </div>
  );
};

export default Header;
