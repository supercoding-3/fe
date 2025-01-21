import '../../scss/components/homepage/Search.scss';

const Search = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        className="search-bar__input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-bar__button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};

export default Search;
