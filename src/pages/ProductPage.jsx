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
      {isModalOpen && (
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
    </>
  );
};

export default ProductPage;
