import { useEffect, useState } from 'react';
import './chat-list.scss';
import { Error } from '@/components/pages';
import { ChatCard } from '@/components/features';
import { EmptyState } from '@/components/ui';
import { chatApi } from '@/api';
import { ChatRoom } from '@/types';

const ChatList = () => {
  const [error, setError] = useState<string | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const getChatRooms = async () => {
    try {
      const response = await chatApi.getUserRooms();
      setChatRooms(response);
    } catch (err) {
      setError('채팅 목록을 불러오는 중에 오류가 발생했습니다');
    }
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <ul className="chat-list">
      {chatRooms.length > 0 ? (
        chatRooms.map((room) => <ChatCard key={room.id} roomInfo={room} />)
      ) : (
        <EmptyState />
      )}
    </ul>
  );
};

export default ChatList;
