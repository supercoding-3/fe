import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from '@/axios/axios';
import '@/scss/components/layoutpage/Header.scss';
import DropdownMenu from '@/components/common/Dropdown';
import { setLogout } from '@/redux/reducers/user';
import { RootState } from '@/redux/store/store';
import { MenuItem } from '@/types/Menu';
import logo from '@/assets/images/logo.png';
import profilePlaceholder from '@/assets/images/placeholder-profile.jpeg';

const Header = () => {
  const dispatch = useDispatch();

  const { isLogin, user } = useSelector((state: RootState) => state.user);

  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropDownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/user/logout');
      dispatch(setLogout());
      alert('로그아웃 되었습니다.');
      closeDropdown();
    } catch (err) {
      console.error('로그아웃 중 오류:', err);
      alert('로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const loggedInMenu: MenuItem[] = [
    { label: '마이페이지', path: '/profile', isLink: true },
    { label: '상품 업로드', path: '/product/create', isLink: true },
    { label: '채팅 목록', path: '/chat', isLink: true },
    {
      label: '로그아웃',
      path: '',
      isLink: false,
      onClick: handleLogout || noop,
    },
  ];

  const loggedOutMenu: MenuItem[] = [
    { label: '로그인', path: '/login', isLink: true },
    { label: '회원가입', path: '/signup', isLink: true },
  ];

  const menuList = isLogin ? loggedInMenu : loggedOutMenu;

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo-image" />
        </Link>
      </div>

      <div className="header__profile">
        <button
          className="header__profile-button"
          onClick={toggleDropdown}
          aria-expanded={isDropDownOpen}
        >
          <img
            src={user?.profileUrl || profilePlaceholder}
            alt="profile"
            className="header__profile-image"
          />
        </button>
        {isDropDownOpen && (
          <DropdownMenu menuList={menuList} closeDropdown={closeDropdown} />
        )}
      </div>
    </header>
  );
};

export default Header;
