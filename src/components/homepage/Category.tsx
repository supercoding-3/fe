import { useState } from 'react';
import '../../scss/components/homepage/Category.scss';
import { PRODUCT_CATEGORY } from '../../constants/productCategory';

interface CategoryProps {
  onCategoryChange: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectCategory = (category: string) => {
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
