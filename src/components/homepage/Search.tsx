import '../../scss/components/homepage/Search.scss';
import PrimaryButton from '../common/PrimaryButton';

// Props 타입 정의
interface SearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
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
