import { useEffect, useState } from 'react';
import axios from '../axios/axios';
import socketService from '../services/socketService';
import ChatDisplay from '../components/chatpage/ChatDisplay';
import ChatInput from '../components/chatpage/ChatInput';

// TODO: 실제 서버 연결 이후 제거
import { startMockServer } from '../mockserver/socketServer';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/chat');
      setMessages(response.data);
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
    <>
      <ChatDisplay messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </>
  );
};

export default ChatPage;
