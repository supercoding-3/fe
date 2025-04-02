import { useRef, useState, useEffect } from 'react';
import './product-image-gallery.scss';

const ProductImageGallery = ({ images }: { images: string[] }) => {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const momentumRef = useRef<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!galleryRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);

    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current);
      momentumRef.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !galleryRef.current) return;

    e.preventDefault();

    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;

    galleryRef.current.scrollLeft = scrollLeft - walk;
    setVelocity(walk);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (!galleryRef.current) return;

    let currentVelocity = velocity;

    const applyMomentum = () => {
      if (!galleryRef.current) return;

      galleryRef.current.scrollLeft -= currentVelocity;
      currentVelocity *= 0.9;

      if (Math.abs(currentVelocity) > 0.5) {
        momentumRef.current = requestAnimationFrame(applyMomentum);
      } else {
        snapToNearestImage();
      }
    };
    applyMomentum();
  };

  const snapToNearestImage = () => {
    if (!galleryRef.current) return;

    const scrollPosition = galleryRef.current.scrollLeft;
    const imageWidth = galleryRef.current.scrollWidth / images.length;
    const targetIndex = Math.round(scrollPosition / imageWidth);

    galleryRef.current.scrollTo({
      left: targetIndex * imageWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    return () => {
      if (momentumRef.current) {
        cancelAnimationFrame(momentumRef.current);
      }
    };
  }, []);

  return (
    <div
      className="image-gallery"
      ref={galleryRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {images.map((img, i) => (
        <img key={i} src={img} alt={`상품이미지${i + 1}`} draggable="false" />
      ))}
    </div>
  );
};

export default ProductImageGallery;
