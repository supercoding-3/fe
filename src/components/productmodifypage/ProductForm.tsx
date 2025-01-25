import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../axios/axios';
import '../../scss/components/productmodifypage/ProductForm.scss';
import PrimaryButton from '../common/PrimaryButton';
import { PRODUCT_CATEGORY } from '../../constants/productCategory';

const ProductForm = ({ productData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formFields, setFormFields] = useState({
    title: '',
    description: '',
    startingBidPrice: 0,
    immediatePrice: 0,
    category: '',
    productEndDate: '',
  });
  const [buttonName, setButtonName] = useState('등록');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isStartingBidPrice, setIsStartingBidPrice] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('이미지는 최대 5개까지 업로드할 수 있습니다.');
      return;
    }

    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormFields((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formatEndDate = new Date(e.target.productEndDate?.value);
    formatEndDate.setHours(23, 59, 59, 999);
    const product = {
      title: formFields.title,
      description: formFields.description,
      startingBidPrice: formFields.startingBidPrice ?? 0,
      immediatePrice: formFields.immediatePrice,
      category: formFields.category,
      productEndDate: formatEndDate,
    };
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    if (location.pathname.includes('edit')) {
      formData.delete('productEndDate');
      try {
        await axios.patch(`/products/${productData.productId}/edit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate('/');
      } catch (err) {
        console.error('상품 데이터를 불러오는 중 오류 발생:', err);
      }
      return;
    }
    images.forEach((image) => {
      formData.append('images', image);
    });
    try {
      await axios.post('/products/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (err) {
      console.error('상품 데이터를 불러오는 중 오류 발생:', err);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('create')) {
      setButtonName('등록');
    } else if (location.pathname.includes('edit')) {
      setButtonName('수정');
      if (productData) {
        setFormFields({
          title: productData.title || '',
          description: productData.description || '',
          startingBidPrice: productData.startingBidPrice || 0,
          immediatePrice: productData.immediatePrice || 0,
          category: productData.category || PRODUCT_CATEGORY[0],
          productEndDate: productData.productEndDate
            ? new Date(productData.productEndDate).toISOString().slice(0, 10)
            : '',
        });
        setIsStartingBidPrice(!!productData.startingBidPrice);
      }
    }
  }, [location.pathname, productData]);

  return (
    <div className="form-container">
      {!location.pathname.includes('edit') && (
        <>
          <div className="preview">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className="preview__img"
              />
            ))}
          </div>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            multiple
            onChange={handleFileChange}
            className="product-form__form__input"
          />
        </>
      )}
      <form onSubmit={handleSubmit} className="product-form">
        <label className="product-form__label">
          <span>제목</span>
          <input
            id="title"
            type="text"
            value={formFields.title}
            onChange={handleInputChange}
            className="product-form__input"
          />
        </label>
        {!location.pathname.includes('edit') && (
          <label className="product-form__label">
            <span>입찰 마감 기한</span>
            <input
              id="productEndDate"
              type="date"
              className="product-form__input"
            />
          </label>
        )}
        <label className="product-form__label">
          <span>경매 시작가</span>
          <div className="product-form__input-wrapper">
            <input
              type="checkbox"
              checked={isStartingBidPrice}
              className="product-form__input-wrapper--checkbox"
              onClick={() => setIsStartingBidPrice(!isStartingBidPrice)}
              onChange={handleInputChange}
            />
            <input
              id="startingBidPrice"
              type="number"
              value={formFields.startingBidPrice}
              className="product-form__input-wrapper--input"
              disabled={!isStartingBidPrice}
              onChange={handleInputChange}
            />
          </div>
        </label>
        <label className="product-form__label">
          <span>즉시 구매가</span>
          <input
            id="immediatePrice"
            type="number"
            value={formFields.immediatePrice}
            className="product-form__input"
            onChange={handleInputChange}
          />
        </label>
        <label className="product-form__label">
          <span>카테고리</span>
          <select
            id="category"
            value={formFields.category}
            className="product-form__input"
            onChange={handleInputChange}
          >
            {PRODUCT_CATEGORY.map((category, i) => (
              <option key={i}>{category}</option>
            ))}
          </select>
        </label>
        <label className="product-form__label">
          <span>설명</span>
          <textarea
            id="description"
            value={formFields.description}
            onChange={handleInputChange}
            rows="10"
            className="product-form__input"
          />
        </label>
        <PrimaryButton type="submit" buttonName={buttonName} isFull={true} />
      </form>
    </div>
  );
};

export default ProductForm;
