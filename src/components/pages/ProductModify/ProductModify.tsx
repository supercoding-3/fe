import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuImagePlus } from 'react-icons/lu';
import './product-modify.scss';
import { ProductHeader, ProductCategoryDropdown } from '@/components/features';
import { Input, Button, FormError } from '@/components/ui';
import { PRODUCT_FORM } from '@/constants/productForm';
import { ProductDetail, ProductForm } from '@/types';
import { productApi } from '@/api';

const ProductModify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  const prevProduct = location.state as ProductDetail;

  const formattedPrevProduct = {
    title: prevProduct?.title,
    description: prevProduct?.description,
    startingBidPrice: prevProduct?.startingBidPrice,
    immediatePrice: prevProduct?.immediatePrice,
    productEndDate: '',
    category: prevProduct?.category,
  } as ProductForm;

  const fieldRefs = useRef<{
    [key: string]:
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | null;
  }>({});

  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(
    prevProduct ? prevProduct.imageUrls : []
  );
  const [formValues, setFormValues] = useState<ProductForm>(
    formattedPrevProduct ?? ({} as ProductForm)
  );

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

  const createProduct = async () => {
    try {
      const formData = new FormData();

      const productData = {
        ...formValues,
        productEndDate: formValues.productEndDate + 'T23:59:59.999Z',
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

      await productApi.create(formData);
      navigate('/');
    } catch (error) {
      setError('상품 생성 중에 오류가 발생했습니다');
    }
  };

  const editProduct = async () => {
    try {
      const formData = new FormData();

      const productData = {
        ...formValues,
        productEndDate: formValues.productEndDate + 'T23:59:59.999Z',
      };

      formData.append(
        'product',
        new Blob([JSON.stringify(productData)], {
          type: 'application/json',
        })
      );
      images.forEach((image) => {
        formData.append('newImages', image);
      });

      await productApi.edit(prevProduct.productId, formData);
      navigate(`/product/${prevProduct.productId}`);
    } catch (error) {
      setError('상품 수정 중에 오류가 발생했습니다');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pathname.includes('edit') && images.length === 0) {
      setError('최소 1장 이상의 상품 이미지가 필요합니다');
      return;
    }

    const requiredFields = [
      'title',
      'productEndDate',
      'startingBidPrice',
      'immediatePrice',
      'category',
      'description',
    ];
    const emptyField = requiredFields.find(
      (field) => !formValues[field as keyof ProductForm]
    );
    if (emptyField) {
      setError('모든 항목을 입력해야 합니다.');
      if (fieldRefs.current[emptyField]) {
        fieldRefs.current[emptyField]?.focus();
      }
      return;
    }

    if (pathname.includes('edit')) {
      editProduct();
    } else {
      createProduct();
    }
  };

  return (
    <div className="product-modify">
      {/* 헤더 */}
      <ProductHeader />

      {/* 이미지 업로드 및 미리보기 */}
      <div className="product-modify__preview">
        <label>
          <LuImagePlus />
          <input type="file" onChange={handleFileChange} multiple />
        </label>
        {previews.map((src, i) => (
          <img key={i} src={src} alt={`preview-${i}`} />
        ))}
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="product-modify__form">
        {PRODUCT_FORM.map(({ id, label, ...rest }) => (
          <label key={id}>
            {label}
            <Input
              {...rest}
              id={id}
              value={formValues[id as keyof ProductForm] || ''}
              onChange={handleFormChange}
              ref={(el: HTMLInputElement) => (fieldRefs.current[id] = el)}
            />
          </label>
        ))}
        <div className="description">
          <div className="description__header">
            <label>상품 소개</label>
            <ProductCategoryDropdown
              defaultOption="카테고리 선택"
              id="category"
              value={formValues.category || ''}
              onChange={handleFormChange}
              ref={(el: HTMLSelectElement) => {
                fieldRefs.current['category'] = el;
              }}
            />
          </div>
          <textarea
            id="description"
            className="description__text"
            value={formValues.description || ''}
            onChange={handleFormChange}
            ref={(el) => {
              fieldRefs.current['description'] = el;
            }}
          />
        </div>
        <Button>확인</Button>
      </form>

      {error && <FormError>{error}</FormError>}
    </div>
  );
};

export default ProductModify;
