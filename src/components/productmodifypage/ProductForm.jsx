import '../../scss/components/productmodifypage/ProductForm.scss';

const ProductForm = ({ setProductData, productData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // formData를 setProductData에 저장
    const formData = new FormData(e.target);
    setProductData(formData);
  };

  return (
    <div className="form-container">
      <div className="preview">
        <img src="" alt="" className="preview__img" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        encType="multipart/form-data"
        className="product-form"
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="product-form__form__input"
        />
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
