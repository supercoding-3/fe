import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios/axios';
import { ChatListCardProps } from 'types/Chat';
import ChatListCard from '../components/chatlistpage/ChatListCard';
import EmptyState from '../components/common/EmptyState';

const ChatListPage = () => {
  const [chatList, setChatList] = useState<ChatListCardProps[]>([]);

  const fetchChatList = async () => {
    try {
      const res = await axios.get('/chat/rooms');
      setChatList(res.data);
    } catch (err) {
      console.error('채팅 목록을 불러오는 중 오류 발생:', err);
    }
  };

  fetchChatList();

  if (chatList.length === 0) {
    return <EmptyState />;
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
