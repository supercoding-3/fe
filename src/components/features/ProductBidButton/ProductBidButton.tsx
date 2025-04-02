import { useEffect, useRef, useState } from 'react';
import './product-bid-button.scss';

const ProductBidButton = ({ isSeller }: { isSeller: boolean }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottom(entry.isIntersecting);
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={observerRef} className="scroll-bottom-marker" />
      <button
        className={`product-bid-button ${
          isBottom ? 'product-bid-button--move-up' : ''
        }`}
        ref={buttonRef}
      >
        {isSeller ? '낙찰' : '입찰'}
      </button>
    </>
  );
};

export default ProductBidButton;
