import { useEffect, useState } from 'react';
import './home.scss';
import { Error } from '@/components/pages';
import { EmptyState, ProductCard } from '@/components/ui';
import { Search } from '@/components/features';
import { productApi } from '@/api';
import { Product } from '@/types';

const Home = () => {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await productApi.getAll();
        setProducts(fetchedProducts);
      } catch (error) {
        setError('상품 데이터를 가져오는 중에 오류가 발생했습니다');
      }
    };

    loadProducts();
  }, []);

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div className="home">
      <header className="home__search">
        <Search />
      </header>
      <section className="home__content">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <EmptyState message="등록된 상품이 없습니다" />
        )}
      </section>
    </div>
  );
};

export default Home;
