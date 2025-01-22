import '../../scss/components/homepage/Search.scss';
import PrimaryButton from '../common/PrimaryButton';

const Search = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="상품 제목을 검색하세요"
        className="search-bar__input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <PrimaryButton type="button" buttonName="검색" onClick={handleSearch} />
    </div>
  );
};

export default Search;
