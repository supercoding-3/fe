import { useState } from 'react';
import imagePlaceholder from '../../assets/images/placeholder-image.png';

const ProductImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0] || '');

  const selectMainImage = (image) => {
    setMainImage('image');
  };

  return (
    <div>
      <img src={mainImage || imagePlaceholder} alt="상품이미지" />
      <div>
        {images.map((img, i) => (
          <img
            src={img}
            alt={`상품이미지${i + 1}`}
            role="button"
            onClick={() => selectMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
