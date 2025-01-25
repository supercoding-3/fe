import { useState } from 'react';
import '../../scss/components/homepage/Category.scss';
import { PRODUCT_CATEGORY } from '../../constants/productCategory';

const Category = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    onCategoryChange(category);
  };

  return (
    <div className="category">
      <button className="category-btn" onClick={toggleDropdown}>
        {selectedCategory}
      </button>
      {isDropdownOpen && (
        <ul className="category-dropdown">
          <li
            className="category-dropdown-item"
            onClick={() => selectCategory('전체')}
          >
            전체
          </li>
          {PRODUCT_CATEGORY.map((category) => (
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
