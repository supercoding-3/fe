import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './header-navigation.scss';

const HeaderNavigation = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button onClick={() => navigate(-1)} className="header__button">
        <IoIosArrowBack />
        뒤로
      </button>
    </header>
  );
};

export default HeaderNavigation;
