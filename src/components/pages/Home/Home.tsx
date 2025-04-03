import { useEffect, useState } from 'react';
import './home.scss';
import { Error } from '@/components/pages';
import {
  ProductSearch,
  ProductCategoryDropdown,
  ProductCard,
} from '@/components/features';
import { EmptyState } from '@/components/ui';
import { productApi } from '@/api';
import { Product } from '@/types';
import logo from '@/assets/images/logo.png';

const Home = () => {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const getProducts = async () => {
    try {
      const fetchedProducts = await productApi.getAll();
      setProducts(fetchedProducts);
    } catch (error) {
      setError('상품 데이터를 가져오는 중에 오류가 발생했습니다');
    }
  };

  const searchProducts = async () => {
    setSelectedCategory('');
    try {
      const fetchedProducts = await productApi.search(`title=${searchTerm}`);
      setProducts(fetchedProducts);
    } catch (error) {
      setError('상품 데이터를 검색하는 중에 오류가 발생했습니다');
    }
  };

  const filterProducts = async () => {
    setSearchTerm('');
    try {
      const fetchedProducts = await productApi.filter(selectedCategory);
      setProducts(fetchedProducts);
    } catch (error) {
      setError('상품 데이터를 검색하는 중에 오류가 발생했습니다');
    }
  };

  useEffect(() => {
    if (searchTerm === '' && selectedCategory === '') {
      getProducts();
    }

    if (searchTerm) {
      searchProducts();
    } else if (selectedCategory) {
      filterProducts();
    }
  }, [searchTerm, selectedCategory]);

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div className="home">
      <header className="home__header">
        <img src={logo} alt="logo" />
        <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <div className="home__filter">
        <ProductCategoryDropdown
          defaultOption="전체"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
      </div>
      <section
        className={`home__content ${
          products.length > 0 ? 'home__content--has-data' : ''
        }`}
      >
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
