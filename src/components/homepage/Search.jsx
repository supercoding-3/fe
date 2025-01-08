import { useState } from 'react';
import '../../scss/components/homepage/Search.scss';

const Search = ({ items, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const results = items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearch(results);
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
