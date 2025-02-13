import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios/axios';
import '../../scss/components/layoutpage/Header.scss';
import { PiRecycleDuotone } from 'react-icons/pi';
import { setLogout } from '../../redux/reducers/user';
import profilePlaceholder from '../../assets/images/placeholder-profile.jpeg';

interface UserState {
  isLogin: boolean;
  profileImage?: string;
}

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector(
    (state: { user: UserState }) => state.user.isLogin
  );
  const profileImage = useSelector(
    (state: { user: UserState }) => state.user.profileImage
  );

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

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <PiRecycleDuotone />
        </Link>
      </div>

      <div className="header__profile">
        <button
          className="header__profile-button"
          onClick={toggleDropdown}
          aria-expanded={isDropDownOpen}
        >
          <img
            src={profileImage || profilePlaceholder}
            alt="profile"
            className="header__profile-image"
          />
        </button>
        {isDropDownOpen && (
          <div className="header__dropdown">
            <ul className="header__dropdown-list">
              {isLogin ? (
                <>
                  <li className="header__dropdown-item">
                    <Link to="/profile" onClick={closeDropdown}>
                      마이페이지
                    </Link>
                  </li>
                  <li className="header__dropdown-item">
                    <Link to="/product/create" onClick={closeDropdown}>
                      상품 업로드
                    </Link>
                  </li>
                  <li className="header__dropdown-item">
                    <Link to="/chat" onClick={closeDropdown}>
                      채팅 목록
                    </Link>
                  </li>
                  <li className="header__dropdown-item">
                    <button
                      onClick={handleLogout}
                      className="header__dropdown-logout"
                    >
                      로그아웃
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="header__dropdown-item">
                    <Link to="/login" onClick={closeDropdown}>
                      로그인
                    </Link>
                  </li>
                  <li className="header__dropdown-item">
                    <Link to="/signup" onClick={closeDropdown}>
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
