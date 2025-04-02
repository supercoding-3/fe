import { Modal } from '@/components/ui';
import { productApi } from '@/api';
import { ProductDetail } from '@/types';
import { toLocalTime } from '@/utils';

const ProductBidOfferModal = ({
  show,
  setShow,
  productDetail,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  productDetail: ProductDetail;
}) => {
  const handleAwarding = async (bidId: number) => {
    // TODO: API 수정 필요
    try {
      await productApi.bidAward(bidId, {
        bidId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} setShow={setShow}>
      <div>
        {productDetail.allBids?.length === 0 ? (
          <p>입찰 내역이 없습니다</p>
        ) : (
          <ul>
            {productDetail.allBids?.map((bid) => {
              return (
                <li key={bid.bidId} className="bid">
                  {productDetail.isSeller && (
                    <button
                      className="bid__button--award"
                      type="button"
                      onClick={() => {
                        handleAwarding(bid.bidId);
                      }}
                    >
                      낙찰
                    </button>
                  )}
                  <span>{bid.bidPrice}원</span>
                  <span>{toLocalTime(bid.bidCreatedAt)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default ProductBidOfferModal;
