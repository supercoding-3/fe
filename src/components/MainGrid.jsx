import React from "react";
import "../scss/MainGrid.scss";

const MainGrid = ({ items }) => {
  return (
    <div className="grid">
      {items.map((item) => (
        <div key={item.id} className="grid__card">
          {item.image ? (
            <img src={item.image} alt={item.title} className="grid__image" />
          ) : (
            <div className="grid__placeholder"></div>
          )}
          <div className="grid__info">
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainGrid;
