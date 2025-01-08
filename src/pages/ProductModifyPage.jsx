import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductForm from '../components/productmodifypage/ProductForm';

const ProductModifyPage = () => {
  const location = useLocation();

  const [productData, setProductData] = useState(null);

  const pathname = location.pathname;

  return (
    <>
      <ProductForm setProductData={setProductData} productData={productData} />
    </>
  );
};

export default ProductModifyPage;
