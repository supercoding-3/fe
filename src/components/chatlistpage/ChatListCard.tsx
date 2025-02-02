import { ChatListCardProps } from 'types/Chat';
import '../../scss/components/chatlistpage/ChatListCard.scss';
import profilePlaceholder from '../../assets/images/placeholder-profile.jpeg';

const ChatListCard = ({ chatData }: { chatData: ChatListCardProps }) => {
  return (
    <div className="chat-list-card">
      <img
        className="chat-list-card__thumbnail"
        src={chatData.thumbnail}
        alt="seller"
      />
      <div>
        <p className="chat-list-card__title">{chatData.title}</p>
        <span className="chat-list-card__price">{chatData.price}</span>
      </div>
      <div className="chat-list-card__seller-info">
        <img
          className="chat-list-card__seller-img"
          src={chatData.sellerImg ?? profilePlaceholder}
          alt="seller"
        />
        <span className="chat-list-card__seller-name">{chatData.seller}</span>
      </div>
    </div>
  );
};

export default ChatListCard;
