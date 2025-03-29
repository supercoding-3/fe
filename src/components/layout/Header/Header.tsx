import { MdMenu } from 'react-icons/md';
import { Input } from '@/components/ui';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <Input type="text" placeholder="검색어를 입력하세요" />
      <MdMenu />
    </header>
  );
};

export default Header;
