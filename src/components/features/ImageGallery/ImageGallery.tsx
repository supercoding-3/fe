import { useState } from 'react';
import './image-gallery.scss';
import imagePlaceholder from '@/assets/images/placeholder-image.png';

const ImageGallery = ({ images }: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(images[0] || '');

  const selectMainImage = (img: string) => {
    setMainImage(img);
  };

  return (
    <div className="image-gallery">
      <img
        src={mainImage || imagePlaceholder}
        alt="상품이미지"
        className="image-gallery__main"
      />
      <div className="image-gallery__sub">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`상품이미지${i + 1}`}
            role="button"
            onClick={() => selectMainImage(img)}
            className="image-gallery__sub--selected"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
