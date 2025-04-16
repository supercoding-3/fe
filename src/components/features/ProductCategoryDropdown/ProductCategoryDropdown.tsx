import './product-category-dropdown.scss';
import { PRODUCT_CATEGORY } from '@/constants/productCategory';

const ProductCategoryDropdown = ({
  defaultOption,
  id,
  value,
  onChange,
  ref,
}: {
  defaultOption: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ref?: React.Ref<HTMLSelectElement>;
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      ref={ref}
      className="product-category-dropdown"
    >
      <option value="">{defaultOption}</option>
      {PRODUCT_CATEGORY.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default ProductCategoryDropdown;
