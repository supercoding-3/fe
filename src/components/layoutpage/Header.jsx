import { useState } from "react";
import { Link } from "react-router-dom";
import profilePlaceholder from "../../assets/images/placeholder-profile.jpeg";
import "../../scss/Header.scss";

const Header = () => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropDownOpen(false);
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
              src={profilePlaceholder}
              alt="profile"
              className="header__profile-image"
            />
          </button>

          {isDropDownOpen && (
            <div className="header__dropdown">
              <ul className="header__dropdown-list">
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
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
