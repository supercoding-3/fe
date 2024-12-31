import { useEffect, useState } from 'react';
import socketService from '../../services/socketService';

// TODO: 실제 서버 연결 이후 제거
import { startMockServer } from '../../mockserver/socketServer';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState('');

  const handleSendMessage = () => {
    socketService.sendMessage(sendingMessage);
    setSendingMessage('');
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
      <div>
        <input
          type="text"
          value={sendingMessage}
          onChange={(e) => setSendingMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatContainer;
