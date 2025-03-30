import { Link } from 'react-router-dom';
import './product-card.scss';
import { Product } from '@/types';
import { formatLocaleString } from '@/utils/formatLocaleString';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/product/${product.productId}`}>
      <article className="product-card">
        <img
          src={product.img}
          alt={product.title}
          className="product-card__thumbnail"
        />
        <div className="product-card__info">
          <p className="info-title">{product.title}</p>
          <div className="info-price">
            <p className="info-price__label">최고 입찰가</p>
            <p className="info-price__value">
              {formatLocaleString(product.price)}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
