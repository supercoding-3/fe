import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosTrash, IoMdCreate } from 'react-icons/io';
import './product-header.scss';
import { ProductDeleteAlert } from '@/components/features';
import { ProductDetail } from '@/types';

const ProductHeader = ({ product }: { product?: ProductDetail }) => {
  const navigate = useNavigate();

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const handleDeleteButton = () => {
    if (!setShowDeleteAlert) return;

    setShowDeleteAlert(true);
  };

  const goToEditPage = () => {
    navigate(`/product/${product?.productId}/edit`, { state: product });
  };

  return (
    <>
      <header className="product-header">
        <button
          onClick={() => navigate(-1)}
          className="product-header__button product-header__button--back"
        >
          <IoIosArrowBack />
        </button>
        {product?.isSeller && (
          <div className="product-header__modify-group">
            <button
              onClick={handleDeleteButton}
              className="product-header__button product-header__button--delete"
            >
              <IoIosTrash />
            </button>
            <button
              onClick={goToEditPage}
              className="product-header__button product-header__button--edit"
            >
              <IoMdCreate />
            </button>
          </div>
        )}
      </header>
      <ProductDeleteAlert
        productId={product?.productId}
        show={showDeleteAlert}
        setShow={setShowDeleteAlert}
      />
    </>
  );
};

export default ProductHeader;
