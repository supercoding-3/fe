import { useState } from 'react';
import '../../scss/components/productpage/ImageGallery.scss';
import imagePlaceholder from '../../assets/images/placeholder-image.png';

const ImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0] || '');

  const selectMainImage = (img) => {
    setMainImage(img);
  };

  return (
    <div className="gallery">
      <img
        src={mainImage || imagePlaceholder}
        alt="상품이미지"
        className="gallery__main"
      />
      <div className="gallery__sub">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`상품이미지${i + 1}`}
            role="button"
            onClick={() => selectMainImage(img)}
            className="gallery__sub-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
