import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import type { PokemonData } from '../../utils/interfaces';
import './MainPage.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<
    Array<{ name: string; description: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10)) || 1;
  const detail = searchParams.get('details');
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
  const isSearchActive = !!searchTerm.trim();

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    if (currentPage !== page) {
      setSearchParams(
        {
          page: page.toString(),
          ...(detail && { details: detail }),
        },
        { replace: true }
      );
    }
  }, [page, detail, searchParams, setSearchParams]);

  const fetchData = async (term: string) => {
    setResults([]);
    setLoading(true);
    setError(null);
    try {
      const trimmedTerm = term.trim().toLowerCase();

      if (!trimmedTerm) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`
        );
        if (!response.ok) throw new Error('Error loading data');
        const data = await response.json();
        const detailedResults = await getDetailedPokemonList(data.results);
        setResults(detailedResults);
        return;
      }

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${trimmedTerm}`
      );
      if (!response.ok) throw new Error('Pokemon not found');

      const pokemonData: PokemonData = await response.json();
      setResults([
        {
          name: pokemonData.name,
          description: formatDescription(pokemonData),
        },
      ]);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error loading ', err.message);
      }
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getDetailedPokemonList = async (
    pokemonList: Array<{ name: string; url: string }>
  ) => {
    const detailedResults = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        if (!res.ok) throw new Error(`Failed to load data for ${pokemon.name}`);
        const details: PokemonData = await res.json();
        return {
          name: details.name,
          description: formatDescription(details),
        };
      })
    );
    return detailedResults;
  };

  const formatDescription = (details: PokemonData): string => {
    const types = details.types.map((t) => t.type.name).join(', ');
    const abilities = details.abilities.map((a) => a.ability.name).join(', ');
    return `Type: ${types}, Weight: ${details.weight / 10} kg, Experience: ${details.base_experience} XP, Abilities: ${abilities}`;
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [page, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchParams({ page: '1' });
    fetchData(term);
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
      ...(detail && !isSearchActive ? { details: detail } : {}),
    });
  };

  return (
    <div className="app-container">
      <nav className="app-container__nav">
        <Link className="app-container__link" to="/about">
          About Us
        </Link>
      </nav>
      <h1 className="app-container__title">Search Pokémon</h1>
      <Search onSearch={handleSearch} disabled={loading} />

      {loading && <p className="app-container__loader">Loading...</p>}
      {error && <p className="app-container__error">{error}</p>}

      <div className="app__results">
        {!loading && !error && results.length > 0 && (
          <CardList items={results} onCardClick={openDetail} />
        )}

        {detail && !loading && !error && (
          <div className="app__detail">
            <button className="app__detail-close" onClick={closeDetail}>
              ×
            </button>
            <PokemonDetail name={detail} />
          </div>
        )}
      </div>

      {!loading && !error && results.length > 0 && (
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
