import { Link } from 'react-router-dom';
import '@/scss/components/homepage/MainGrid.scss';

interface Item {
  productId: string | number;
  img?: string;
  title: string;
  price: string | number;
}

interface MainGridProps {
  items: Item[];
}

const MainGrid: React.FC<MainGridProps> = ({ items }) => {
  return (
    <div className="grid">
      {items.map((item) => (
        <Link to={`/product/${item.productId}`} key={item.productId}>
          <div className="grid__card">
            {item.img ? (
              <img src={item.img} alt={item.title} className="grid__image" />
            ) : (
              <div className="grid__placeholder"></div>
            )}
            <div className="grid__info">
              <h3>
                {item.title.length > 30
                  ? `${item.title.slice(0, 30)}...`
                  : item.title}
              </h3>
              <p>{item.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainGrid;
