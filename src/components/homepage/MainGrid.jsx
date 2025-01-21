import '../../scss/components/homepage/MainGrid.scss';
import {Link} from "react-router-dom";

const MainGrid = ({items}) => {
  return (<div className="grid">
    {items.map((item) => (<div key={item.id} className="grid__card">
      {item.img ? (<img src={item.img} alt={item.title} className="grid__image"/>) : (
        <div className="grid__placeholder"></div>)}
      <div className="grid__info">
        <Link to={`/product/${item.id}`}><h3>
          {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
        </h3></Link>
        <p>{item.price}</p>
      </div>
    </div>))}
  </div>);
};
export default MainGrid;
