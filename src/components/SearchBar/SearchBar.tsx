import "./SearchBar.css";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Поиск по стране..."
      onChange={(e) => onSearch(e.target.value)}
      className="searchbar__input"
    />
  );
}
