import { useEffect, useRef } from 'react';
import '../../scss/components/chatpage/ChatDisplay.scss';

const ChatDisplay = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-display">
      {messages.map((message, i) => (
        <p
          key={i}
          className={`chat-display__message ${
            message.includes('Echo')
              ? 'chat-display__message-received'
              : 'chat-display__message-sent'
          }`}
        >
          {message}
        </p>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatDisplay;
