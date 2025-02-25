import { Link } from 'react-router-dom';
import '@/scss/components/homepage/ProductList.scss';
import EmptyState from '@/components/common/EmptyState';
import { ProductData } from '@/types/Product';

const ProductList = ({ products }: { products: ProductData[] }) => {
  console.log(products);

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <Link to={`/product/${product.productId}`} key={product.productId}>
          <div className="grid__card">
            {product.img ? (
              <img
                src={product.img}
                alt={product.title}
                className="grid__image"
              />
            ) : (
              <div className="grid__placeholder"></div>
            )}
            <div className="grid__info">
              <h3>
                {product.title.length > 30
                  ? `${product.title.slice(0, 30)}...`
                  : product.title}
              </h3>
              <p>{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
