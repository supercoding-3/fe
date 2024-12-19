import React from "react";
import "../scss/MainList.scss";
import ahri from "../assets/images/ahri.jpeg";
import Search from "../components/Search";
import MainGrid from "../components/MainGrid";
import Category from "../components/Category";

const MainList = () => {
  const items = [
    {
      id: 1,
      title: "강아지 팝니다",
      price: "현재 입찰가 100,0000원",
      image: ahri,
    },
    {id: 2, title: "아이템 2", price: "입찰가 50,000원", image: ""},
    {id: 3, title: "아이템 3", price: "입찰가 30,000원", image: ""},
    {id: 4, title: "아이템 4", price: "입찰가 40,000원", image: ""},
    {id: 5, title: "아이템 5", price: "입찰가 70,000원", image: ""},
  ];

  return (
    <>
      <Search/>
      <main className="main">
        <Category/>
        <MainGrid items={items}/>
        <button className="main__scroll-top" aria-label="위로">
          ↑
        </button>
      </main>
    </>
  );
};

export default MainList;
