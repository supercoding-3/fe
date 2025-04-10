import { useState } from 'react';
import { IoIosArrowDropupCircle, IoIosSend } from 'react-icons/io';
import './chat-input.scss';
import { Input } from '@/components/ui';
import { ChatMenu } from '@/components/features';

const ChatInput = ({
  onSendMessage,
}: {
  onSendMessage: (inputValue: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
      <ChatMenu isMenuOpen={isMenuOpen} />
      <div className="footer-container">
        <button
          className="footer-container__menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IoIosArrowDropupCircle />
        </button>
        <div className="chat-input">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="chat-input__button" onClick={sendMessage}>
            <IoIosSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
