import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuImagePlus } from 'react-icons/lu';
import { IoIosArrowBack } from 'react-icons/io';
import './product-modify.scss';
import { Header } from '@/components/layout';
import { Input, Button, FormError } from '@/components/ui';
import { PRODUCT_FORM } from '@/constants/productForm';
import { PRODUCT_CATEGORY } from '@/constants/productCategory';
import { ProductForm } from '@/types';

const ProductModify = () => {
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [formValues, setFormValues] = useState<ProductForm>({} as ProductForm);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 5) {
      setError('이미지는 최대 5개까지 업로드할 수 있습니다.');
      return;
    }
    setImages(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues((prev) => ({ ...prev, category: e.target.value }));
  };

  return (
    <div className="product-modify">
      <Header>
        <Link to="/" className="product-modify__back">
          <IoIosArrowBack /> 홈으로
        </Link>
      </Header>
      <div className="product-modify__preview">
        <label>
          <LuImagePlus />
          <input type="file" onChange={handleFileChange} multiple />
        </label>
        {previews.map((src, i) => (
          <img key={i} src={src} alt={`preview-${i}`} />
        ))}
      </div>
      <form className="product-modify__form">
        {PRODUCT_FORM.map((input) => (
          <label key={input.id}>
            {input.label}
            <Input
              {...input}
              value={formValues[input.id as keyof ProductForm] || ''}
              onChange={handleInputChange}
            />
          </label>
        ))}
        <div className="description">
          <div className="description__label">
            <label htmlFor="description">상품 소개</label>
            <select
              id="category"
              value={formValues.category || ''}
              onChange={handleCategoryChange}
            >
              {PRODUCT_CATEGORY.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <textarea id="description" rows={10} className="description__input" />
        </div>
        <Button>확인</Button>
      </form>
      {error && <FormError>{error}</FormError>}
    </div>
  );
};

export default ProductModify;
