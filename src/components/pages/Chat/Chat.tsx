import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './chat.scss';
import socketService from '@/services/socketService';
import { Error } from '@/components/pages';
import { ChatDisplay, ChatInput } from '@/components/features';
import { chatApi } from '@/api';
import { ChatData } from '@/types';
import { RootState } from '@/redux/store';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState<string>('');
  const [messages, setMessages] = useState<ChatData[]>([]);
  const [inputValue, setInputValue] = useState('');

  const { id: chatRoomId } = useParams();
  const roomInfo = location.state;
  const { user } = useSelector((state: RootState) => state.user);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const messageData = {
        sender: user.userEmail,
        receiver: 'test1@test.com', //TODO: 수정 필요
        message: inputValue,
        messageType: 'CHAT',
      };
      socketService.sendJsonMessage(messageData);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      if (!chatRoomId || chatRoomId != roomInfo.chatRoomId) {
        setError('채팅방 정보를 알 수 없습니다');
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
      setError('실시간 채팅에 연결할 수 없습니다');
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
    <div className="chat">
      <header className="chat__header">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </button>
      </header>

      <ChatDisplay messages={messages} userEmail={user.userEmail} />

      <footer className="chat__bottom">
        <ChatInput onSendMessage={setInputValue} />
      </footer>
    </div>
  );
};

export default Chat;
