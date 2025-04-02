import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './product.scss';
import { Error } from '@/components/pages';
import {
  ProductHeader,
  ProductImageGallery,
  ProductBidChart,
} from '@/components/features';
import { productApi } from '@/api';
import { ProductDetail } from '@/types';
// TODO: 공용컴포넌트로 만들기
import spinner from '@/assets/images/spinner.svg';

const Product = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productDetail, setProductDetail] = useState<ProductDetail>(
    {} as ProductDetail
  );

  const { id } = useParams();

  const getProduct = async () => {
    if (!id) {
      setError('상품 정보를 찾을 수 없습니다');
      return;
    }

    try {
      const response = await productApi.getById(id);
      setProductDetail(response);
    } catch (error) {
      setError('상품 데이터를 가져오는 중에 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (error) {
    return <Error errorMessage={error} />;
  }

  if (loading) {
    return <img src={spinner} alt="spinner" />;
  }

  return (
    <div className="product-container">
      <ProductHeader product={productDetail} />
      <ProductImageGallery images={productDetail.imageUrls} />
      <div>
        <div className="product-info__header">
          <h1>{productDetail.title}</h1>
          <span>/ {productDetail.category}</span>
        </div>
        <p className="product-desc">{productDetail.description}</p>
      </div>
      <ProductBidChart allBids={productDetail.allBids} />
    </div>
  );
};

export default Product;
