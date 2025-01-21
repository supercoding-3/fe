import { useEffect, useState } from 'react';
import Search from '../components/homepage/Search';
import MainGrid from '../components/homepage/MainGrid';
import Category from '../components/homepage/Category';
import '../scss/pages/HomePage.scss';
import { FaArrowUp } from 'react-icons/fa';
import axios from '../axios/axios';

const HomePage = () => {
  const [items, setItems] = useState([]); // 모든 상품 데이터
  const [filteredItems, setFilteredItems] = useState([]); // 필터링된 상품 데이터
  const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const [isSearchPerformed, setIsSearchPerformed] = useState(false); // 검색 수행 여부
  const [searchQuery, setSearchQuery] = useState('');

  // 고정된 카테고리 목록
  const categories = [
    '전체',
    '의류',
    '전자제품',
    '가구',
    '아동상품',
    '뷰티_미용',
    '취미생활',
    '식품',
    '기타',
  ];

  // 기본 상품 데이터 가져오기
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
      setFilteredItems(items); // 전체 카테고리 선택 시 모든 상품 표시
    } else {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`/products/category/${category}`); // 카테고리별 상품 가져오기
        setFilteredItems(response.data);
        setIsSearchPerformed(false); // 카테고리 변경 시 검색 상태 초기화
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
          categories={categories} // 고정된 카테고리를 전달
          onCategoryChange={handleCategoryChange} // 카테고리 변경 핸들러 연결
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
