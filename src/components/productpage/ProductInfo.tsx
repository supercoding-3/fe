import '../../scss/components/productpage/ProductInfo.scss';

const ProductInfo = ({ productData }) => {
  if (!productData) {
    return <div>상품 정보를 불러올 수 없습니다</div>;
  }

  return (
    <div className="info">
      <div className="info__header">
        <h1 className="info__title">{productData.title}</h1>
        <div className="info__category">{productData.category}</div>
      </div>
      <div className="info__desc">{productData.description}</div>
    </div>
  );
};

export default ProductInfo;
