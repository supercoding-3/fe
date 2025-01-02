const ChatDisplay = ({ messages }) => {
  return (
    <div>
      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}
    </div>
  );
};

export default ChatDisplay;
