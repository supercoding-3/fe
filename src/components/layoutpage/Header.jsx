import { useState } from "react";
import profilePlaceholder from "../../assets/images/placeholder-profile.jpeg";
import "../../scss/Header.scss";

const Header = () => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">logo</div>
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
                <li className="header__dropdown-item">로그인</li>
                <li className="header__dropdown-item">회원가입</li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
