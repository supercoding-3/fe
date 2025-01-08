const ProductForm = ({ setProductData, productData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // formData를 setProductData에 저장
    const formData = new FormData(e.target);
    setProductData(formData);
  };

  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" />
        <input type="text" />
        <input type="date" />
        <div>
          <input type="checkbox" />
          <input type="number" />
        </div>
        <input type="number" />
        <select>
          <option>1</option>
          <option>2</option>
        </select>
        <textarea></textarea>
        <button type="submit">{productData ? '수정' : '등록'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
