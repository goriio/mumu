import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { Dispatch, SetStateAction } from 'react';

const StyledSearchBar = styled.div`
  position: relative;
  margin: 0.5rem 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 500;
  color: var(--color-text);
  border: 1px solid var(--color-text);
  border-radius: var(--border-radius);
  outline: 1px solid var(--color-fg);
`;

const SearchIcon = styled(BiSearch)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: var(--color-text);
`;

interface SearchBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <StyledSearchBar>
      <Input
        aria-label='Search'
        placeholder='Search for music or artists...'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <SearchIcon />
    </StyledSearchBar>
  );
}
