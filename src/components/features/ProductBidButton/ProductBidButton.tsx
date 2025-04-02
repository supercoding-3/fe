import { useEffect, useRef, useState } from 'react';
import './product-bid-button.scss';
import { ProductBidOfferModal } from '@/components/features';
import { ProductDetail } from '@/types';

const ProductBidButton = ({
  productDetail,
}: {
  productDetail: ProductDetail;
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const [isBottom, setIsBottom] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
        onClick={() => setModalOpen(true)}
      >
        {productDetail?.isSeller ? '낙찰' : '입찰'}
      </button>
      <ProductBidOfferModal
        show={modalOpen}
        setShow={setModalOpen}
        productDetail={productDetail}
      />
    </>
  );
};

export default ProductBidButton;
