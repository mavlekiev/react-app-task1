import { Component } from 'react';
import './App.scss';
import Search from './Search';
import CardList from './CardList';

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonDetails {
  name: string;
  types: PokemonType[];
  weight: number;
  base_experience: number;
  abilities: PokemonAbility[];
}

interface AppState {
  results: Array<{ name: string; description: string }>;
  loading: boolean;
  error: string | null;
}

export default class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount(): void {
    const saveTerm = localStorage.getItem('searchTerm') || '';
    this.fetchData(saveTerm);
  }

  fetchData = async (term: string) => {
    this.setState({ loading: true, error: null });
    try {
      const trimmedTerm = term.trim().toLowerCase();

      if (!trimmedTerm) {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=20'
        );
        if (!response.ok) throw new Error('Error loading data');
        const data = await response.json();
        const detailedResults = await this.getDetailedPokemonList(data.results);
        this.setState({ results: detailedResults });
        return;
      }

      const directResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${trimmedTerm}`
      );
      if (directResponse.ok) {
        const data: PokemonDetails = await directResponse.json();
        this.setState({
          results: [
            {
              name: data.name,
              description: this.formatDescription(data),
            },
          ],
        });
        localStorage.setItem('searchTerm', trimmedTerm);
        return;
      }
      this.setState({ error: 'Pokemon not found' });
    } catch (error) {
      console.error('Error loading data', error);
      this.setState({ error: 'Failed to load data' });
    } finally {
      this.setState({ loading: false });
    }
  };

  getDetailedPokemonList = async (
    pokemonList: Array<{ name: string; url: string }>
  ) => {
    const detailedResults = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details: PokemonDetails = await res.json();
        return {
          name: details.name,
          description: this.formatDescription(details),
        };
      })
    );
    return detailedResults;
  };

  formatDescription = (details: PokemonDetails): string => {
    const types = details.types.map((t) => t.type.name).join(', ');
    const abilities = details.abilities.map((a) => a.ability.name).join(', ');

    return `
      Type: ${types || 'No data'},
      Weight: ${details.weight / 10} kg,
      Experience: ${details.base_experience} XP,
      Abilities: ${abilities || 'No data'}
    `.trim();
  };

  handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.fetchData(term);
  };

  throwError = () => {
    throw new Error('Test Error for ErrorBoundary');
  };

  render() {
    return (
      <div className="app-container">
        <h1 className="app-container__title">Search Pokemon</h1>
        <Search onSearch={this.handleSearch} />
        {this.state.loading && (
          <p className="app-container__loader">Loading...</p>
        )}
        {this.state.error && (
          <p className="app-container__error">{this.state.error}</p>
        )}
        <CardList items={this.state.results} />
        <button className="app-container__button" onClick={this.throwError}>
          Raise an error
        </button>
      </div>
    );
  }
}
