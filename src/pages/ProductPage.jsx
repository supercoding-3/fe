import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../axios/axios';
import '../scss/pages/ProductPage.scss';
import ImageGallery from '../components/productpage/ImageGallery';
import AuctionChart from '../components/productpage/AuctionChart';
import ProductInfo from '../components/productpage/ProductInfo';

const ProductPage = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];

  const [productData, setProductData] = useState(null);

  // TODO: 추후에 삭제
  const mockData = {
    id: 1,
    title: '27MK600MW 모니터 팔아요~',
    price: 100000,
    productDesc: '여기에 상품 설명이 들어갑니다',
    seller: '판매자닉네임',
    sellerImg: null,
    productImages: [
      'https://picsum.photos/310',
      'https://picsum.photos/320',
      'https://picsum.photos/330',
      'https://picsum.photos/340',
      'https://picsum.photos/350',
    ],
    chartData: [],
  };

  const fetchProductData = async () => {
    try {
      const res = await axios.get(`/products/${productId}`);
      const data = res.data;
      setProductData(data);
    } catch (err) {
      console.error('상품 데이터를 불러오는 중 오류 발생:', err);
    }
  };

  useEffect(() => {
    setProductData(mockData);
    fetchProductData();
  }, []);

  if (!productData) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="product-page">
      <ImageGallery images={productData.productImages} />
      <AuctionChart />
      <ProductInfo productData={productData} />
    </div>
  );
};

export default ProductPage;
