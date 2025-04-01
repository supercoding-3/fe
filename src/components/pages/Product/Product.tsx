import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './product.scss';
import { Error } from '@/components/pages';
import { ProductHeader, ImageGallery, BidChart } from '@/components/features';
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

  return (
    <>
      <div>
        <ProductHeader product={productDetail} />
        {loading ? (
          <img src={spinner} alt="spinner" />
        ) : (
          <section className="product-detail">
            <div className="product-info-wrapper">
              <ImageGallery images={productDetail.imageUrls} />
              <div className="product-info-wrapper__content">
                <h1 className="product-title">{productDetail.title}</h1>
                <p className="product-desc">{productDetail.description}</p>
              </div>
            </div>
            <BidChart />
          </section>
        )}
      </div>
    </>
  );
};

export default Product;
