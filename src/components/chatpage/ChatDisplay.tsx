import { useEffect, useRef } from 'react';
import '@/scss/components/chatpage/ChatDisplay.scss';
import { ChatData } from '@/types/Chat';

const ChatDisplay = ({ messages }: { messages: ChatData[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className="chat-display">
      {messages.map((message, i) => (
        <p
          key={i}
          className={
            'chat-display__message'
            //   `${
            //   message.includes('Echo')
            //     ? 'chat-display__message-received'
            //     : 'chat-display__message-sent'
            // }`
          }
        >
          {message.message}
        </p>
      ))}
      <div ref={messagesEndRef}></div>
    </section>
  );
};

export default ChatDisplay;
