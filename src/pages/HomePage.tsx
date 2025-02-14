import { FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import '@/scss/pages/HomePage.scss';
import Search from '@/components/homepage/Search';
import ProductList from '@/components/homepage/ProductList';
import Category from '@/components/homepage/Category';
import axios from '@/axios/axios';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/products/all');
      setItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('상품 데이터를 불러오는 데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (category: string) => {
    if (category === '전체') {
      setFilteredItems(items);
    } else {
      try {
        setIsLoading(true);
        const response = await axios.get(`/products/category/${category}`);
        setFilteredItems(response.data);
      } catch (error) {
        console.error(
          `"${category}" 카테고리 데이터를 불러오는 데 실패했습니다:`,
          error
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFilteredItems(items);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`/products/search?title=${searchQuery}`);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (isLoading) {
    return <p className="loading">로딩 중...</p>;
  }

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <div className="items">
        <Category onCategoryChange={handleCategoryChange} />
        <ProductList products={filteredItems} />
      </div>
      {/* TODO: 기능 추가 */}
      <button className="scroll-top" aria-label="위로">
        <FaArrowUp />
      </button>
    </>
  );
};

export default HomePage;
