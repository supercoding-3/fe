import { useState } from 'react';
import axios from '../../axios/axios';
import '../../scss/components/productmodifypage/ProductForm.scss';

const ProductForm = ({ productData }) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageData = new FormData(images);

    try {
      const res = await axios.post('/product/register', {
        product: formData,
        images: imageData,
      });
    } catch (err) {
      console.error('상품 데이터를 불러오는 중 오류 발생:', err);
    }
  };

  return (
    <div className="form-container">
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
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="product-form"
      >
        <label className="product-form__label">
          <span>제목</span>
          <input type="text" className="product-form__input" />
        </label>
        <label className="product-form__label">
          <span>입찰 마감 기한</span>
          <input type="date" className="product-form__input" />
        </label>
        <label className="product-form__label">
          <span>경매 시작가</span>
          <div className="product-form__input-wrapper">
            <input
              type="checkbox"
              className="product-form__input-wrapper--checkbox"
            />
            <input
              type="number"
              className="product-form__input-wrapper--input"
            />
          </div>
        </label>
        <label className="product-form__label">
          <span>즉시 구매가</span>
          <input type="number" className="product-form__input" />
        </label>
        <label className="product-form__label">
          <span>카테고리</span>
          <select className="product-form__input">
            <option>1</option>
            <option>2</option>
          </select>
        </label>
        <label className="product-form__label">
          <span>설명</span>
          <textarea rows="10" className="product-form__input" />
        </label>
        <button type="submit" className="product-form__button">
          {productData ? '수정' : '등록'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
