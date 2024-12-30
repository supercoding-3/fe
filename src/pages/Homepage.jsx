import Search from '../components/homepage/Search';
import MainGrid from '../components/homepage/MainGrid';
import Category from '../components/homepage/Category';
import '../scss/MainList.scss';
import { FaArrowUp } from 'react-icons/fa';

// TODO: 이후에 삭제
import ahri from '../assets/images/ahri.jpeg';

const HomePage = () => {
  const items = [
    {
      id: 1,
      title: '강아지 팝니다',
      price: '현재 입찰가 100,0000원',
      image: ahri,
    },
    { id: 2, title: '아이템 2', price: '입찰가 50,000원', image: '' },
    { id: 3, title: '아이템 3', price: '입찰가 30,000원', image: '' },
    { id: 4, title: '아이템 4', price: '입찰가 40,000원', image: '' },
    { id: 5, title: '아이템 5', price: '입찰가 70,000원', image: '' },
  ];

  return (
    <>
      <Search />
      <div className="main">
        <Category />
        <MainGrid items={items} />
        <button className="main__scroll-top" aria-label="위로">
          <FaArrowUp />
        </button>
      </div>
    </>
  );
};

export default HomePage;
