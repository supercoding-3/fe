import { useEffect, useState } from 'react';
import axios from '../axios/axios';
import socketService from '../services/socketService';
import ChatDisplay from '../components/chatpage/ChatDisplay';
import ChatMenu from '../components/chatpage/ChatMenu';
import ChatInput from '../components/chatpage/ChatInput';
import '../scss/pages/ChatPage.scss';

// TODO: 실제 서버 연결 이후 제거
import { startMockServer } from '../mockserver/socketServer';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

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
    // TODO: 실제 서버 연결 이후 제거
    const mockServer = startMockServer();

    socketService.connect();

    socketService.onMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      mockServer.stop();
      socketService.disconnect();
    };
  }, []);

  return (
    <div className="chat-page">
      <ChatDisplay messages={messages} />
      <div className="chat-page__bottom">
        <ChatMenu />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
