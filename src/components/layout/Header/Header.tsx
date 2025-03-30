import { MdMenu } from 'react-icons/md';
import { Input } from '@/components/ui';
import './header.scss';

const Header = () => {
  return (
    <div className="header">
      <Input type="text" placeholder="검색어를 입력하세요" />
      <MdMenu />
    </div>
  );
};

export default Header;
