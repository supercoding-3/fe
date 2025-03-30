import './chat-card.scss';
import { ChatRoom } from '@/types';
import profilePlaceholder from '@/assets/images/placeholder-profile.jpeg';

// TODO: className 수정
const ChatCard = ({ roomInfo }: { roomInfo: ChatRoom }) => {
  return (
    <div className="chat-card">
      <img
        className="chat-card__thumbnail"
        src={roomInfo.thumbnail}
        alt="seller"
      />
      <div>
        <p className="chat-card__title">{roomInfo.title}</p>
        <span className="chat-card__price">{roomInfo.price}</span>
      </div>
      <div className="chat-card__seller-info">
        <img
          className="chat-card__seller-img"
          src={roomInfo.sellerImg ?? profilePlaceholder}
          alt="seller"
        />
        <span className="chat-card__seller-name">{roomInfo.seller}</span>
      </div>
    </div>
  );
};

export default ChatCard;
