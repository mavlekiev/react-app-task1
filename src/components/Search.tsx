import { Component, type ChangeEvent, type FormEvent } from 'react';
import './Search.scss';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          className="search-form__input"
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder="Enter the name of the pokemon"
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </form>
    );
  }
}
