import { ChangeEvent } from 'react';
import { Input } from '@/components/ui';

const Search = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => {
  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value)
      }
      placeholder="검색어를 입력하세요"
    />
  );
};

export default Search;
