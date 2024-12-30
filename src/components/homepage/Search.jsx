import '../../scss/Search.scss';

const Search = () => {
  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search" className="search-bar__input" />
        <button className="search-bar__button">검색</button>
      </div>
    </div>
  );
};

export default Search;
