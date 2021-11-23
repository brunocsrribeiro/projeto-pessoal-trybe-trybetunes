import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoriteSong: false,
    };

    this.onSongs = this.onSongs.bind(this);
  }

  async onSongs(music) {
    const { favoriteSong } = this.state;

    if (!favoriteSong) {
      this.setState({
        favoriteSong: true,
        loading: true,
      });
    }

    await addSong(music);

    this.setState({
      loading: false,
    });
  }

  render() {
    const {
      music: { trackName, previewUrl, trackId },
    } = this.props;

    const { loading, favoriteSong } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favoriteSong }
            onChange={ () => this.onSongs() }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.instanceOf(Object).isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
