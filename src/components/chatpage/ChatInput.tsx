import { useState } from 'react';
import '../../scss/components/chatpage/ChatInput.scss';
import { IoIosSend } from 'react-icons/io';

const ChatInput = ({
  onSendMessage,
}: {
  onSendMessage: (inputValue: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.shiftKey && e.key === 'Enter') return;

    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-input">
      <textarea
        className="chat-input__textarea"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="chat-input__button" onClick={sendMessage}>
        <IoIosSend />
      </button>
    </div>
  );
};

export default ChatInput;
