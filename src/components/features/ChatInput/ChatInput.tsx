import { IoIosSend } from 'react-icons/io';
import { useState } from 'react';
import './chat-input.scss';

const ChatInput = ({
  onSendMessage,
}: {
  onSendMessage: (inputValue: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
