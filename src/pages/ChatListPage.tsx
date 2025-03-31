import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChatListCard from '@/components/chatlistpage/ChatListCard';
import EmptyState from '@/components/common/EmptyState';
import axios from '@/axios/axios';
import { ChatListCardProps } from '@/types/Chat';

const ChatListPage = () => {
  const [chatList, setChatList] = useState<ChatListCardProps[]>([]);

  const fetchChatList = async () => {
    try {
      const res = await axios.get('api/chat/rooms');
      setChatList(res.data);
    } catch (err) {
      console.error('채팅 목록을 불러오는 중 오류 발생:', err);
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  console.log(chatList);

  if (chatList.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="chat-list">
      {chatList.map((chatData, i) => (
        <li key={i}>
          <Link to={`/chat/${chatData.chatRoomId}`}>
            <ChatListCard chatData={chatData} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChatListPage;
