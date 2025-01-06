import profilePlaceholder from '../../assets/images/placeholder-image.png';

const ProductInfo = ({ productData }) => {
  return (
    <div>
      <div>
        <h1>{productData.title}</h1>
        <div>
          <img src={productData.sellerImg ?? profilePlaceholder} alt="seller" />
          <span>{productData.seller}</span>
        </div>
      </div>
      <div>{productData.productDesc}</div>
    </div>
  );
};

export default ProductInfo;
