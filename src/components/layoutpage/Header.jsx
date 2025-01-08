import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profilePlaceholder from '../../assets/images/placeholder-profile.jpeg';
import '../../scss/components/layoutpage/Header.scss';
import user, { setLogout } from '../../redux/modules/user';
import { useState } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user?.isLogin);
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropDownOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    alert('로그아웃 되었습니다.');
    closeDropdown();
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Link to="/">logo</Link>
        </div>

        <div className="header__profile">
          <button
            className="header__profile-button"
            onClick={toggleDropdown}
            aria-expanded={isDropDownOpen}
          >
            <img
              src={user?.profileImage || profilePlaceholder} // 로그인 상태에 따라 이미지 변경
              alt="profile"
              className="header__profile-image"
            />
          </button>

          {isDropDownOpen && (
            <div className="header__dropdown">
              <ul className="header__dropdown-list">
                {isLogin ? ( // 로그인 여부에 따른 메뉴 표시
                  <>
                    <li className="header__dropdown-list-item">
                      <Link to="/profile" onClick={closeDropdown}>
                        마이페이지
                      </Link>
                    </li>
                    <li>
                      <button className="header__dropdown-list-item" onClick={handleLogout}>
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
    </>
  );
};

export default Header;
