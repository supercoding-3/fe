import './chat-menu.scss';
import { CHAT_MENU } from '@/constants/chatMenu';

const ChatMenu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <ul className={`chat-menu ${isMenuOpen ? '' : 'chat-menu--hidden'}`}>
      {CHAT_MENU.map((menu) => (
        <li key={menu} className="chat-menu__item">
          <button>{menu}</button>
        </li>
      ))}
    </ul>
  );
};

export default ChatMenu;
