const ChatInput = ({ setMessage }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        setMessage(e.target.value);
        setMessage('');
      }
    }
  };

  const handleSendBtn = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
    setMessage('');
  };

  return (
    <div>
      <input type="text" onKeyDown={handleKeyDown} />
      <button onClick={handleSendBtn}>전송</button>
    </div>
  );
};

export default ChatInput;
