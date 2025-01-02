import '../../scss/components/chatpage/ChatDispaly.scss';

const ChatDisplay = ({ messages }) => {
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
    </div>
  );
};

export default ChatDisplay;
