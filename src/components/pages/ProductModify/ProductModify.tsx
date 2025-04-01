import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LuImagePlus } from 'react-icons/lu';
import './product-modify.scss';
import { HeaderNavigation } from '@/components/layout';
import { Input, Button, FormError } from '@/components/ui';
import { PRODUCT_FORM } from '@/constants/productForm';
import { PRODUCT_CATEGORY } from '@/constants/productCategory';
import { ProductForm } from '@/types';
import { productApi } from '@/api';

const ProductModify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<ProductForm>({} as ProductForm);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 5) {
      setError('이미지는 최대 5개까지 업로드할 수 있습니다');
      return;
    }
    setError(null);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (images.length === 0) {
      setError('최소 1장 이상의 상품 이미지가 필요합니다');
      return;
    }

    try {
      const formData = new FormData();
      const productData = {
        ...formValues,
        productEndDate: new Date(formValues.productEndDate).setHours(
          23,
          59,
          59,
          999
        ),
      };
      formData.append(
        'product',
        new Blob([JSON.stringify(productData)], {
          type: 'application/json',
        })
      );
      images.forEach((image) => {
        formData.append('images', image);
      });

      await productApi.createProduct(formData);
      navigate('/');
    } catch (error) {
      setError('상품 수정 중에 오류가 발생했습니다');
    }
  };

  useEffect(() => {
    if (location.pathname === '/product/edit') {
      // TODO: 이전 값 보내야함
    }
  }, [location.pathname]);

  return (
    <div className="product-modify">
      <HeaderNavigation />
      <div className="product-modify__preview">
        <label>
          <LuImagePlus />
          <input type="file" onChange={handleFileChange} multiple />
        </label>
        {previews.map((src, i) => (
          <img key={i} src={src} alt={`preview-${i}`} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="product-modify__form">
        {PRODUCT_FORM.map(({ id, label, ...rest }) => (
          <label key={id}>
            {label}
            <Input
              {...rest}
              id={id}
              value={formValues[id as keyof ProductForm] || ''}
              onChange={handleFormChange}
            />
          </label>
        ))}
        <div className="description">
          <div className="description__category">
            <label htmlFor="category">상품 소개</label>
            <select
              id="category"
              value={formValues.category || ''}
              onChange={handleFormChange}
            >
              {PRODUCT_CATEGORY.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <textarea
            id="description"
            rows={10}
            className="description__text"
            onChange={handleFormChange}
          />
        </div>
        <Button>확인</Button>
      </form>
      {error && <FormError>{error}</FormError>}
    </div>
  );
};

export default ProductModify;
