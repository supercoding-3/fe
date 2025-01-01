import { useEffect, useState } from 'react';
import socketService from '../../services/socketService';
import ChatInput from './ChatInput';

// TODO: 실제 서버 연결 이후 제거
import { startMockServer } from '../../mockserver/socketServer';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    if (message.trim()) {
      socketService.sendMessage(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  useEffect(() => {
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
    <div>
      <div>
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
