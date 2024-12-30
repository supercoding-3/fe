import { Link } from 'react-router-dom';
import ChatListCard from '../components/chatlistpage/ChatListCard';

const ChatListPage = () => {
  const mockData = [
    {
      id: 1,
      title: '27MK600MW 모니터 팔아요~',
      price: 100000,
      seller: '상대방 닉네임',
      sellerImg: null,
      thumbnail: 'https://picsum.photos/300',
    },
    {
      id: 2,
      title: '27MK600MW 모니터 팔아요~',
      price: 100000,
      seller: '상대방 닉네임',
      sellerImg: null,
      thumbnail: 'https://picsum.photos/100',
    },
    {
      id: 3,
      title: '27MK600MW 모니터 팔아요~',
      price: 100000,
      seller: '상대방 닉네임',
      sellerImg: null,
      thumbnail: 'https://picsum.photos/200',
    },
  ];

  return (
    <ul>
      {mockData.map((chatData, i) => (
        <li key={i}>
          <Link to={`/chat/${chatData.id}`}>
            <ChatListCard chatData={chatData} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChatListPage;
