import { useEffect, useState } from 'react';
import axios from '../axios/axios';
import socketService from '../services/socketService';
import ChatDisplay from '../components/chatpage/ChatDisplay';
import ChatMenu from '../components/chatpage/ChatMenu';
import ChatInput from '../components/chatpage/ChatInput';
import '../scss/pages/ChatPage.scss';
import { CiMenuKebab } from 'react-icons/ci';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchMessages = async () => {
    try {
      // const res = await axios.get('/chat');
      // setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = (message) => {
    if (message.trim()) {
      socketService.sendMessage(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socketService.connect();

    socketService.onMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
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
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
