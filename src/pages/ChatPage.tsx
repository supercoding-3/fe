import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../axios/axios';
import '../scss/pages/ChatPage.scss';
import socketService from '../services/socketService';
import ChatDisplay from '../components/chatpage/ChatDisplay';
import ChatMenu from '../components/chatpage/ChatMenu';
import ChatInput from '../components/chatpage/ChatInput';
import { CiMenuKebab } from 'react-icons/ci';
import { ChatData } from 'types/Chat';

const ChatPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const transactionId = pathname.split('/')[2];

  const [messages, setMessages] = useState<ChatData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/chat/room/${transactionId}`);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = () => {
    // TODO: 채팅정보 가져오기
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
    fetchMessages();
  }, []);

  useEffect(() => {
    handleSendMessage();
  }, [inputValue]);

  useEffect(() => {
    socketService.connect(transactionId);

    socketService.onMessage((data) => {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.messageType === 'CHAT') {
          setMessages((prevMessages) => [...prevMessages, parsedData]);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

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

export default ChatPage;
