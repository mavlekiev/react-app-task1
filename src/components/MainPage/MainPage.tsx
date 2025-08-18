'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import PokemonDetail from '../../pages/PokemonDetail/PokemonDetail';
import {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
  useGetPokemonDetailsQuery,
} from '../../store/pokemonApiSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Flyout from '../../components/Flyout/Flyout';
import { useTheme } from '../../context/ThemeContext';
import { useTranslations } from 'next-intl';
import './MainPage.scss';
import type {
  Pokemon,
  PokemonDetails,
  PokemonListResponse,
} from '../../utils/interfaces';
import Link from 'next/link';

interface MainPageProps {
  initialData: PokemonListResponse | null;
  page: number;
}

export default function MainPage({
  initialData,
  page: initialPage,
}: MainPageProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
  const detailName = searchParams.get('details');
  const isSearchActive = !!searchTerm.trim();

  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
    refetch: refetchList,
  } = useGetPokemonListQuery(
    { limit: 20, offset: (initialPage - 1) * 20 },
    { skip: isSearchActive || !!initialData }
  );

  const dataToUse = initialData || listData;

  const { data: detailsList } = useGetPokemonDetailsQuery(
    dataToUse?.results.map((p: Pokemon) => p.name) || [],
    { skip: !dataToUse || isSearchActive }
  );

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
    : detailsList?.map((p) => ({
        name: p.name,
        description: formatDescription(p),
      })) || [];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');
    if (detailName) newParams.set('details', detailName);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const openDetail = (name: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', initialPage.toString());
    newParams.set('details', name);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const closeDetail = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', initialPage.toString());
    newParams.delete('details');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const goToPage = (newPage: number) => {
    if (newPage < 1) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    if (detailName) newParams.set('details', detailName);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="app-container">
      <div className="app-container__block">
        <nav className="app-container__nav">
          <Link className="app-container__link" href="/about">
            {t('about')}
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
      <h1 className="app-container__title">{t('search')}</h1>
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
            disabled={isSearchActive || initialPage <= 1}
            onClick={() => goToPage(initialPage - 1)}
          >
            Previous
          </button>
          <span className="pagination__span">Page {initialPage}</span>
          <button
            className="pagination__button"
            disabled={isSearchActive}
            onClick={() => goToPage(initialPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
