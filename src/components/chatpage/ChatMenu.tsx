import '@/scss/components/chatpage/ChatMenu.scss';

const ChatMenu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <ul className={`chat-menu ${isMenuOpen ? '' : 'chat-menu--hidden'}`}>
      <li className="chat-menu__item">
        <button className="chat-menu__item-button">거래 취소</button>
      </li>
      <li className="chat-menu__item">
        <button className="chat-menu__item-button">거래 완료</button>
      </li>
    </ul>
  );
};

export default ChatMenu;
