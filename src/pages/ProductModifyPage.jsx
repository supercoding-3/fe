import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../axios/axios';
import ProductForm from '../components/productmodifypage/ProductForm';

const ProductModifyPage = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    try {
      const res = await axios.post(`/product/${1}`, {});
      const data = res.data;
      setProductData(data);
      console.log('res', res);
    } catch (err) {
      console.error('상품 데이터를 불러오는 중 오류 발생:', err);
    }
  };

  useEffect(() => {
    if (pathname.includes('edit')) {
      fetchProductData();
    }
  }, []);

  return (
    <>
      <ProductForm productData={productData} />
    </>
  );
};

export default ProductModifyPage;
