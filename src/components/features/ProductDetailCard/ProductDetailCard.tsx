import { Link } from 'react-router-dom';
import './product-detail-card.scss';
import { Product } from '@/types';

const ProductDetailCard = ({ product }: { product: Product }) => {
  const DEATIL_INFO = [
    {
      id: 'title',
      label: '상품명',
      emoji: '📦',
    },
    {
      id: 'price',
      label: '최고 입찰가',
      emoji: '🔥',
    },
    {
      id: 'productStatus',
      label: '상태',
      emoji: '📍',
    },
  ];

  return (
    <Link to={`/product/${product.productId}`}>
      <article className="product-detail-card">
        <img
          src={product.img}
          alt={product.title}
          className="product-thumbnail"
        />
        <div className="product-info">
          {DEATIL_INFO.map((info) => (
            <div key={info.id} className="info-wrapper">
              <div className="info-wrapper__label">
                <span>{info.emoji}</span>
                <span>{info.label}</span>
              </div>
              <p className="info-wrapper__value">
                {product[info.id as keyof Product] ?? '-'}
              </p>
            </div>
          ))}
        </div>
      </article>
    </Link>
  );
};

export default ProductDetailCard;
