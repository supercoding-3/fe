import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios/axios';
import ChatListCard from '../components/chatlistpage/ChatListCard';

const ChatListPage = () => {
  const [chatList, setChatList] = useState([]);

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

  if (chatList.length === 0) {
    return (
      <div>
        <p>채팅 목록이 없습니다</p>
      </div>
    );
  }

  return (
    <ul className="chat-list">
      {chatList.map((chatData, i) => (
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
