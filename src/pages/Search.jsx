import React, { Component } from 'react';
import Header from '../components/Header';
import ArtistCard from '../components/ArtistCard';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      artistName: '',
      collectionName: [],
      loading: false,
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandlerClick = this.onHandlerClick.bind(this);
  }

  onHandleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  async onHandlerClick(name) {
    this.setState({
      loading: true,
    });
    const artistOrBand = await searchAlbumsAPIs(name);

    this.setState({
      artistName: name,
      name: '',
      collectionName: artistOrBand,
      loading: false,
    });
  }

  render() {
    const {
      artistName,
      loading,
      name,
      collectionName,
    } = this.state;
    const minLength = 2;
    const lengthSearching = name.length < minLength;

    return (
      loading ? <Loading /> : (
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
              type="button"
              data-testid="search-artist-button"
              disabled={ lengthSearching }
              onClick={ () => this.onHandlerClick(name) }
            >
              Pesquisar
            </button>
          </form>
          {
            (collectionName.length === 0)
              ? <p>Nenhum álbum foi encontrado</p>
              : (
                <div>
                  <h2>
                    {`Resultado de álbuns de:
                    ${artistName}`}
                  </h2>
                  <div>
                    {
                      collectionName.map((album) => (
                        <ArtistCard
                          key={ album.artistId }
                          { ...album }
                        />
                      ))
                    }
                  </div>
                </div>
              )
          }
        </div>
      )
    );
  }
}

export default Search;
