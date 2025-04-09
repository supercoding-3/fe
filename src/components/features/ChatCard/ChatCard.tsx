import { useNavigate } from 'react-router-dom';
import './chat-card.scss';
import profilePlaceholder from '@/assets/images/placeholder-profile.jpeg';
import { toLocalNumber } from '@/utils';
import { ChatRoom } from '@/types';

const ChatCard = ({ roomInfo }: { roomInfo: ChatRoom }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate(`/chat/${roomInfo.chatRoomId}`, { state: roomInfo })
      }
      className="chat-card"
    >
      <img
        className="chat-card__product-img"
        src={roomInfo.productProfileImageUrl}
        alt="product image"
      />
      <div className="chat-card__info">
        <div className="chat-card__info--product">
          <p>{roomInfo.productName}</p>
          <span>{toLocalNumber(roomInfo.productPrice)}원</span>
        </div>
        <div className="chat-card__info--trader">
          <img
            src={roomInfo.oppositeProfileImageUrl ?? profilePlaceholder}
            alt="trader profile image"
          />
          <span>{roomInfo.oppositeNickname}</span>
        </div>
      </div>
    </button>
  );
};

export default ChatCard;
