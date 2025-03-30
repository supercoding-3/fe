import { useState, useEffect } from 'react';
import './loading.scss';
import spinner from '@/assets/images/spinner.svg';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading">
      <img src={spinner} alt="spinner" className="loading__spinner" />
      <p className="loading__text">로딩 중{dots}</p>
    </div>
  );
};

export default Loading;
