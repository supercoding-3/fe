import { useState } from 'react';
import '../../scss/components/homepage/Category.scss';

const Category = ({ categories, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    onCategoryChange(category); // 선택한 카테고리를 부모 컴포넌트로 전달
  };

  return (
    <div className="category">
      <button className="category-btn" onClick={toggleDropdown}>
        {selectedCategory}
      </button>
      {isDropdownOpen && (
        <ul className="category-dropdown">
          {categories.map((category) => (
            <li
              key={category}
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
