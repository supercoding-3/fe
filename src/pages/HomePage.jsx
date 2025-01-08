import { useState } from 'react';
import Search from '../components/homepage/Search';
import MainGrid from '../components/homepage/MainGrid';
import Category from '../components/homepage/Category';
import '../scss/pages/HomePage.scss';
import { FaArrowUp } from 'react-icons/fa';
// TODO: 이후에 삭제
import ahri from '../assets/images/ahri.jpeg';

const HomePage = () => {
  const items = [
    { id: 1, title: '강아지 팝니다', category: '기타', price: '100,000원', image: ahri },
    { id: 2, title: '셔츠', category: '의류', price: '50,000원', image: '' },
    { id: 3, title: '노트북', category: '전자제품', price: '1,000,000원', image: '' },
    { id: 4, title: '책상', category: '가구', price: '200,000원', image: '' },
    { id: 5, title: '화장품', category: '뷰티/미용', price: '30,000원', image: '' },
  ];

  // const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState('전체');


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('/api/products/all'); // Axios로 API 호출
  //       setItems(response.data); // 상품 데이터를 상태에 저장
  //       setFilteredItems(response.data); // 초기 필터링 데이터 설정
  //     } catch (error) {
  //       console.error('상품 데이터를 불러오는 데 실패했습니다:', error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  const handleSearch = (searchResults) => {
    // 검색 결과에 따라 필터링
    const results = searchResults.filter(
      (item) => selectedCategory === '전체' || item.category === selectedCategory
    );
    setFilteredItems(results);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === '전체') {
      // 전체를 선택하면 모든 아이템 표시
      setFilteredItems(items);
    } else {
      // 카테고리에 따라 필터링
      const results = items.filter((item) => item.category === category);
      setFilteredItems(results);
    }
  };

  return (
    <>
      <Search items={items} onSearch={handleSearch} />
      <div className="items">
        <Category onCategoryChange={handleCategoryChange} />
        <MainGrid items={filteredItems} />
      </div>
      <button className="scroll-top" aria-label="위로">
        <FaArrowUp/>
      </button>
    </>
  );
};

export default HomePage;
