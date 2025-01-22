import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios/axios';
import '../scss/pages/ProductPage.scss';
import ImageGallery from '../components/productpage/ImageGallery';
import AuctionChart from '../components/productpage/AuctionChart';
import PrimaryButton from '../components/common/PrimaryButton';
import ProductInfo from '../components/productpage/ProductInfo';
import Modal from '../components/common/Modal';
import { formatLocalTime } from '../utils/formatLocalTime';

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const productId = pathname.split('/')[2];

  const [productData, setProductData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const [isAwarded, setIsAwarded] = useState(false);

  const fetchProductData = async () => {
    try {
      const res = await axios.get(`/products/${productId}`);
      const data = res.data;
      setProductData(data);
      setIsAwarded(data.productStatus === '낙찰');
    } catch (err) {
      console.error('상품 데이터를 불러오는 중 오류 발생:', err);
    }
  };

  const handleAuctionButton = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBidding = async () => {
    if (bidPrice <= 0 || productData?.startingBidPrice > bidPrice) {
      alert('입찰가는 입찰시작가보다 커야 합니다');
    }
    try {
      await axios.post(`/products/${productId}/bid`, {
        bidPrice: bidPrice,
      });
      fetchProductData();
    } catch (err) {
      console.error('입찰 중 오류 발생:', err);
    }
  };

  const handleAwarding = async (bidId) => {
    try {
      await axios.post(`/products/${productId}/award`, {
        bidId: bidId,
      });
    } catch (err) {
      console.error('낙찰 중 오류 발생:', err);
    }
  };

  const deleteProduct = async () => {
    console.log('deleteProduct');
    try {
      await axios.delete(`/products/${productId}`);
      navigate('/');
    } catch (err) {
      console.error('삭제 중 오류 발생:', err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (!productData) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <div className="product-page">
        {productData.isSeller && (
          <div className="product-page__buttons">
            <button onClick={deleteProduct}>삭제</button>
            <span>/</span>
            <Link to={`${pathname}/edit`}>수정</Link>
          </div>
        )}
        <ImageGallery images={productData.imageUrls} />
        <AuctionChart allBids={productData.allBids} />
        <PrimaryButton
          type="button"
          buttonName={
            productData.isSeller
              ? isAwarded
                ? '낙찰 완료'
                : '낙찰'
              : isAwarded
              ? '입찰 완료'
              : '입찰'
          }
          onClick={handleAuctionButton}
          isFull={true}
          theme={isAwarded ? 'disabled' : 'primary'}
        />
        <ProductInfo productData={productData} />
      </div>
      {isModalOpen && productData.isSeller && (
        <Modal onClose={onCloseModal}>
          {productData.allBids.length === 0 ? (
            <p>입찰 내역이 없습니다</p>
          ) : (
            <ul>
              {productData.allBids.map((bid) => {
                return (
                  <li key={bid.bidId} className="bid">
                    {productData.isSeller && (
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
                    <span>{formatLocalTime(bid.bidCreatedAt)}</span>
                    <span>{bid.userNickname}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </Modal>
      )}
      {isModalOpen && !productData.isSeller && (
        <Modal onClose={onCloseModal}>
          <form onSubmit={handleBidding} className="bidding-form">
            <div className="bidding-form__header">
              <label>입찰액을 입력하세요</label>
              <span>입찰시작가: {productData.startingBidPrice}원</span>
            </div>
            <input
              type="number"
              value={bidPrice}
              onChange={(e) => setBidPrice(e.target.value)}
              required
              className="bidding-form__input"
            />
            <PrimaryButton
              type="submit"
              buttonName="입찰"
              isFull={true}
              onClick={handleBidding}
            />
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProductPage;
