import { useEffect, useRef } from 'react';
import './chat-display.scss';
import { ChatData } from '@/types';

const ChatDisplay = ({
  messages,
  userEmail,
}: {
  messages: ChatData[];
  userEmail: string;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className="chat-display">
      {messages.map((message, i) => (
        <p
          key={i}
          className={`chat-display__message ${
            message.receiver === userEmail
              ? 'chat-display__message-received'
              : 'chat-display__message-sent'
          }`}
        >
          {message.message}
        </p>
      ))}
      <div ref={messagesEndRef}></div>
    </section>
  );
};

export default ChatDisplay;
