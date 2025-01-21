import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios/axios';
import ChatListCard from '../components/chatlistpage/ChatListCard';

const ChatListPage = () => {
  const [chatList, setChatList] = useState([]);

  console.log(chatList);

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

  const fetchChatList = async () => {
    try {
      const res = await axios.get('/chat/rooms');
      setChatList(res.data);
    } catch (err) {
      console.error('채팅 목록을 불러오는 중 오류 발생:', err);
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

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
