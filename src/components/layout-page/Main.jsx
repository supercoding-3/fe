import React from "react";
import "../../scss/Main.scss";
import ahri from "../../assets/images/ahri.jpeg"; // 이미지 예시

const Main = () => {
  const items = [
    {
      id: 1,
      title: "강아지 팝니다",
      price: "현재 입찰가 100,0000원",
      image: ahri,
    },
    { id: 2, title: "아이템 2", price: "입찰가 50,000원", image: "" },
    { id: 3, title: "아이템 3", price: "입찰가 30,000원", image: "" },
    { id: 4, title: "아이템 4", price: "입찰가 40,000원", image: "" },
    { id: 5, title: "아이템 5", price: "입찰가 70,000원", image: "" },
  ];

  return (
    <main className="main">
      <div className="main__header">
        <button className="main__button">전체</button>
      </div>
      <div className="main__grid">
        {items.map((item) => (
          <div key={item.id} className="main__card">
            {item.image ? (
              <img src={item.image} alt={item.title} className="main__image" />
            ) : (
              <div className="main__placeholder"></div>
            )}
            <div className="main__info">
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="main__scroll-top" aria-label="위로">
        ↑
      </button>
    </main>
  );
};

export default Main;
