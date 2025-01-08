import '../../scss/components/productpage/ProductInfo.scss';
import profilePlaceholder from '../../assets/images/placeholder-profile.jpeg';

const ProductInfo = ({ productData }) => {
  return (
    <div className="info">
      <div className="info__header">
        <h1 className="info__title">{productData.title}</h1>
        <div className="info__seller">
          <img
            src={productData.sellerImg ?? profilePlaceholder}
            alt="seller"
            className="info__seller-img"
          />
          <span className="info__seller-name">{productData.seller}</span>
        </div>
      </div>
      <div className="info__desc">{productData.productDesc}</div>
    </div>
  );
};

export default ProductInfo;
