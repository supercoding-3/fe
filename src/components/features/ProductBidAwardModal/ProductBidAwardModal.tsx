import { useState } from 'react';
import './product-bid-award-modal.scss';
import { Modal, EmptyState, FormError } from '@/components/ui';
import { productApi } from '@/api';
import { ProductDetail } from '@/types';
import { toLocalNumber, toLocalTime } from '@/utils';

const ProductBidAwardModal = ({
  show,
  setShow,
  productDetail,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  productDetail: ProductDetail;
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleAwarding = async (bidId: number) => {
    try {
      await productApi.bidAward(productDetail.productId, bidId);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      setErrorMessage('낙찰 시도 중에 오류가 발생했습니다');
    }
  };

  return (
    <Modal show={show} setShow={setShow}>
      {productDetail.allBids?.length === 0 ? (
        <EmptyState message="입찰 내역이 없습니다" />
      ) : (
        <ul className="offer-list">
          {productDetail.allBids?.map((bid) => {
            return (
              <li key={bid.bidId} className="offer-list__item">
                <button
                  type="button"
                  onClick={() => {
                    handleAwarding(bid.bidId);
                  }}
                >
                  낙찰
                </button>
                <span>{toLocalNumber(bid.bidPrice)} 원</span>
                <span>{toLocalTime(bid.bidCreatedAt)}</span>
              </li>
            );
          })}
          <FormError>{errorMessage}</FormError>
        </ul>
      )}
    </Modal>
  );
};

export default ProductBidAwardModal;
