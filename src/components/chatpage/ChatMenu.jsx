import '../../scss/components/chatpage/ChatMenu.scss';
import { CiMenuKebab } from 'react-icons/ci';

const ChatMenu = () => {
  return (
    <div className="chat-menu">
      <button className="chat-menu__button">
        <CiMenuKebab />
      </button>
    </div>
  );
};

export default ChatMenu;
