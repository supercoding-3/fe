import { useEffect, useState } from 'react';
import socketService from '../../services/socketService';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState('');

  const handleSendMessage = () => {
    socketService.sendMessage(sendingMessage);
    setSendingMessage('');
  };

  useEffect(() => {
    socketService.connect();

    socketService.socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, { text: data, sender: 'other' }]);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <div>
      <div>{messages}</div>
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
