import { useState } from 'react';
import '../../scss/components/homepage/Category.scss';

const Category = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    '전체',
    '의류',
    '전자제품',
    '가구',
    '아동상품',
    '뷰티/미용',
    '취미생활',
    '식품',
    '기타',
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    onCategoryChange(category); // 선택된 카테고리를 부모 컴포넌트로 전달
  };

  return (
    <div className="category">
      <button className="category-btn" onClick={toggleDropdown}>
        {selectedCategory}
      </button>
      {isDropdownOpen && (
        <ul className="category-dropdown">
          {categories.map((category, index) => (
            <li
              key={index}
              className="category-dropdown-item"
              onClick={() => selectCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
