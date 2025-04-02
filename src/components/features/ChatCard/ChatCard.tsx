import { Link } from 'react-router-dom';
import './chat-card.scss';
import profilePlaceholder from '@/assets/images/placeholder-profile.jpeg';
import { formatLocaleString } from '@/utils/formatLocaleString';
import { ChatRoom } from '@/types';

const ChatCard = ({ roomInfo }: { roomInfo: ChatRoom }) => {
  return (
    <Link to={`/chat/${roomInfo.chatRoomId}`} className="chat-card">
      <img
        className="chat-card__product-img"
        src={roomInfo.productProfileImageUrl}
        alt="seller"
      />
      <div className="chat-card__info">
        <div className="chat-card__info--product">
          <p>{roomInfo.productName}</p>
          <span>{formatLocaleString(roomInfo.productPrice)}원</span>
        </div>
        <div className="chat-card__info--trader">
          <img
            src={roomInfo.oppositeProfileImageUrl ?? profilePlaceholder}
            alt="trader profile image"
          />
          <span>{roomInfo.oppositeNickname}</span>
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
