import { useState } from 'react';
import { Alert, Button } from '@/components/ui';
import './product-delete-alert.scss';
import { productApi } from '@/api';

const ProductDeleteAlert = ({
  productId,
  show,
  setShow,
}: {
  productId?: number;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<string>('');

  const deleteProduct = () => {
    if (!productId) return;

    try {
      productApi.delete(productId);
    } catch (error) {
      setError('상품을 삭제하는 중에 오류가 발생했습니다');
    }
  };

  return (
    <Alert show={show} setShow={setShow}>
      <div className="product-delete-alert">
        <p className="product-delete-alert__message">
          상품을 삭제하시겠습니까?
        </p>
        <p className="product-delete-alert__message--error">{error}</p>
        <div className="product-delete-alert__button-group">
          <Button isFull={false} onClick={deleteProduct}>
            확인
          </Button>
          <Button
            isFull={false}
            theme="secondary"
            onClick={() => {
              setShow(false), setError('');
            }}
          >
            취소
          </Button>
        </div>
      </div>
    </Alert>
  );
};

export default ProductDeleteAlert;
