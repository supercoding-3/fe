import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../axios/axios';
import '../scss/pages/ProductPage.scss';
import ImageGallery from '../components/productpage/ImageGallery';
import AuctionChart from '../components/productpage/AuctionChart';
import PrimaryButton from '../components/common/PrimaryButton';
import ProductInfo from '../components/productpage/ProductInfo';
import Modal from '../components/common/Modal';
import { formatLocalTime } from '../utils/formatLocalTime';

const ProductPage = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];

  const [productData, setProductData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);

  const fetchProductData = async () => {
    try {
      const res = await axios.get(`/products/${productId}`);
      const data = res.data;
      setProductData(data);
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

  useEffect(() => {
    fetchProductData();
  }, []);

  if (!productData) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <div className="product-page">
        <ImageGallery images={productData.imageUrls} />
        <AuctionChart allBids={productData.allBids} />
        <PrimaryButton
          type="button"
          buttonName={productData.isSeller ? '낙찰' : '입찰'}
          onClick={handleAuctionButton}
          isFull={true}
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
                    {productData.isSeller && <button>낙찰</button>}
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
