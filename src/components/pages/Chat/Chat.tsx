import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CiMenuKebab } from 'react-icons/ci';
import './chat.scss';
import { Error } from '@/components/pages';
import socketService from '@/services/socketService';
import { chatApi } from '@/api';
import { ChatData } from '@/types';
import { ChatDisplay, ChatMenu, ChatInput } from '@/components/features';

const Chat = () => {
  const [error, setError] = useState<string>('');
  const [messages, setMessages] = useState<ChatData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { chatRoomId } = useParams();

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const messageData = {
        // sender: chatData.sender,
        // receiver: chatData.receiver,
        message: inputValue,
        // messageType: chatData.messageType,
      };
      socketService.sendJsonMessage(messageData);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      if (!chatRoomId) {
        setError('채팅 데이터를 불러오는 중에 오류가 발생했습니다');
        return;
      }

      try {
        const response = await chatApi.getRoomMessages(chatRoomId);
        setMessages(response);
      } catch (err) {
        setError('채팅 데이터를 불러오는 중에 오류가 발생했습니다');
      }
    };

    getMessages();
  }, []);

  useEffect(() => {
    handleSendMessage();
  }, [inputValue]);

  useEffect(() => {
    if (!chatRoomId) {
      setError('채팅방 정보를 확인할 수 없습니다');
      return;
    }

    socketService.connect(chatRoomId);

    socketService.onMessage((data: string) => {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.messageType === 'CHAT') {
          setMessages((prevMessages) => [...prevMessages, parsedData]);
        }
      } catch (error) {
        setError('소켓 연결 중에 오류가 발생했습니다');
      }
    });

    return () => {
      socketService.disconnect();
    };
  }, [chatRoomId]);

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div className="chat-page">
      <ChatDisplay messages={messages} />
      <div className="chat-page__bottom">
        <ChatMenu isMenuOpen={isMenuOpen} />
        <button
          className="chat-page__bottom-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <CiMenuKebab />
        </button>
        <ChatInput onSendMessage={setInputValue} />
      </div>
    </div>
  );
};

export default Chat;
