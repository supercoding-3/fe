import { useEffect, useState } from 'react';
import axios from '../axios/axios';
import '../scss/pages/HomePage.scss';
import Search from '../components/homepage/Search';
import MainGrid from '../components/homepage/MainGrid';
import Category from '../components/homepage/Category';
import { PRODUCT_CATEGORY } from '../constants/productCategory';
import { FaArrowUp } from 'react-icons/fa';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get('/products/all');
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error('상품 데이터를 불러오는 데 실패했습니다:', error);
        setError('상품 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // 카테고리 변경 핸들러
  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);

    if (category === '전체') {
      setFilteredItems(items);
    } else {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `/products/category/${selectedCategory}`
        );
        setFilteredItems(response.data);
        setIsSearchPerformed(false);
      } catch (error) {
        console.error(
          `"${category}" 카테고리 데이터를 불러오는 데 실패했습니다:`,
          error
        );
        setError(`"${category}" 카테고리 데이터를 불러오는 데 실패했습니다.`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 검색 핸들러
  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setIsSearchPerformed(false);
      setFilteredItems(items);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setIsSearchPerformed(true);
      const response = await axios.get(`/products/search?title=${searchQuery}`);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
      setError('검색 결과가 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <Category
          categories={PRODUCT_CATEGORY}
          onCategoryChange={handleCategoryChange}
        />
        {error ? (
          <p className="error-message">{error}</p>
        ) : isSearchPerformed && filteredItems.length === 0 ? (
          <p className="no-results">검색 결과가 없습니다.</p>
        ) : filteredItems.length > 0 ? (
          <MainGrid items={filteredItems} />
        ) : (
          <p className="no-items">현재 상품이 없습니다.</p>
        )}
      </div>
      <button className="scroll-top" aria-label="위로">
        <FaArrowUp />
      </button>
    </>
  );
};

export default HomePage;
