import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };

    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onHandleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name } = this.state;
    const minLength = 2;
    const lengthSearching = name.length < minLength;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="name"
            data-testid="search-artist-input"
            onChange={ this.onHandleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ lengthSearching }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
