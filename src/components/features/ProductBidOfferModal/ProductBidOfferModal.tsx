import { useState } from 'react';
import './product-bid-offer-modal.scss';
import { Modal, Button, Input, FormError } from '@/components/ui';
import { productApi } from '@/api';
import { ProductDetail, IBidOffer } from '@/types';
import { toLocalNumber } from '@/utils';

const ProductBidOfferModal = ({
  show,
  setShow,
  productDetail,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  productDetail: ProductDetail;
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputElement = e.currentTarget[0] as HTMLInputElement;
    let payload;

    if (!inputElement.value) {
      setErrorMessage('입찰액을 입력해주세요');
      return;
    } else {
      payload = {
        bidPrice: inputElement.value,
      } as IBidOffer;
    }

    try {
      await productApi.bidOffer(productDetail.productId, payload);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      setErrorMessage('입찰 시도 중에 오류가 발생했습니다');
    }
  };

  return (
    <Modal show={show} setShow={setShow}>
      <form onSubmit={handleSubmit} className="offer-form">
        <p className="offer-form__title">입찰액을 입력하세요</p>
        <div className="offer-form__info">
          <p>입찰시작가: {toLocalNumber(productDetail.startingBidPrice)}원</p>
          <p>즉시낙찰가: {toLocalNumber(productDetail.immediatePrice)}원</p>
        </div>
        <Input type="number" required />
        <FormError>{errorMessage}</FormError>
        <Button type="submit">확인</Button>
      </form>
    </Modal>
  );
};

export default ProductBidOfferModal;
