import type { SearchProps } from '../../utils/interfaces';
import './Search.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Search = ({
  onSearch,
  disabled,
}: SearchProps & { disabled: boolean }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    onSearch(trimmedTerm);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter the name of the pokemon"
        disabled={disabled}
      />
      <button className="search-form__button" type="submit" disabled={disabled}>
        Search
      </button>
    </form>
  );
};

export default Search;
