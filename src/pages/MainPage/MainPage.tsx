import { Link, useSearchParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
  useGetPokemonDetailsQuery,
} from '../../store/pokemonApiSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Flyout from '../../components/Flyout/Flyout';
import { useTheme } from '../../context/ThemeContext';
import './MainPage.scss';
import type { PokemonDetails } from '../../utils/interfaces';

const MainPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const detailName = searchParams.get('details');
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
  const isSearchActive = !!searchTerm.trim();

  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
    refetch: refetchList,
  } = useGetPokemonListQuery(
    { limit: 20, offset: page * 20 },
    { skip: isSearchActive }
  );

  const { data: detailsList, isLoading: isDetailsLoading } =
    useGetPokemonDetailsQuery(listData?.results.map((p) => p.name) || [], {
      skip: !listData || isSearchActive,
    });

  const {
    data: pokemonData,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
  } = useGetPokemonByNameQuery(searchTerm.trim(), { skip: !isSearchActive });

  const formatDescription = (details: PokemonDetails): string => {
    const types = details.types.map((t) => t.type.name).join(', ');
    const abilities = details.abilities.map((a) => a.ability.name).join(', ');
    return `Type: ${types}, Weight: ${details.weight / 10} kg, Experience: ${details.base_experience} XP, Abilities: ${abilities}`;
  };

  const results = isSearchActive
    ? pokemonData
      ? [
          {
            name: pokemonData.name,
            description: formatDescription(pokemonData),
          },
        ]
      : []
    : isDetailsLoading
      ? []
      : detailsList?.map((p) => ({
          name: p.name,
          description: formatDescription(p),
        })) || [];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchParams({ page: '1' });
  };

  const openDetail = (name: string) => {
    setSearchParams({ page: page.toString(), details: name });
  };

  const closeDetail = () => {
    setSearchParams({ page: page.toString() });
  };

  const goToPage = (newPage: number) => {
    if (newPage < 1) return;
    setSearchParams({
      page: newPage.toString(),
      ...(detailName && !isSearchActive ? { details: detailName } : {}),
    });
  };

  return (
    <div className="app-container">
      <div className="app-container__block">
        <nav className="app-container__nav">
          <Link className="app-container__link" to="/about">
            About Us
          </Link>
        </nav>
        <div className="app-container__theme-switch">
          <label>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            {theme === 'light' ? '🌙' : '☀️'}
          </label>
        </div>
      </div>
      <h1 className="app-container__title">Search Pokémon</h1>
      <Search
        onSearch={handleSearch}
        disabled={isListLoading || isPokemonLoading}
      />

      <button
        onClick={() => refetchList()}
        disabled={isListLoading}
        className="pagination__button"
      >
        {isListLoading ? 'Refreshing...' : 'Refresh List'}
      </button>

      {isListLoading && !isSearchActive && (
        <p className="app-container__loader">Loading list...</p>
      )}
      {isPokemonLoading && isSearchActive && (
        <p className="app-container__loader">Loading Pokémon...</p>
      )}
      {isListError && (
        <p className="app-container__error">Failed to load Pokémon list</p>
      )}
      {isPokemonError && (
        <p className="app-container__error">Pokémon not found</p>
      )}

      <div className="app__results">
        {!isListError && !isPokemonError && results.length > 0 && (
          <CardList items={results} onCardClick={openDetail} />
        )}

        {detailName && !isListError && !isPokemonError && (
          <div className="app__detail">
            <button className="app__detail-close" onClick={closeDetail}>
              ×
            </button>
            <PokemonDetail name={detailName} />
          </div>
        )}
      </div>

      <Flyout />

      {!isListError && !isPokemonError && results.length > 0 && (
        <div className="pagination">
          <button
            className="pagination__button"
            disabled={isSearchActive || page <= 1}
            onClick={() => goToPage(page - 1)}
          >
            Previous
          </button>
          <span className="pagination__span">Page {page}</span>
          <button
            className="pagination__button"
            disabled={isSearchActive}
            onClick={() => goToPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
