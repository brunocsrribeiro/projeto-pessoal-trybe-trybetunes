import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, favoriteSong, funcFavorites } = this.props;

    return (
      <div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="trackId">
          Favorita
          <input
            type="checkbox"
            id="trackId"
            value={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favoriteSong }
            onChange={ funcFavorites }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  funcFavorites: PropTypes.func.isRequired,
  favoriteSong: PropTypes.bool.isRequired,
};
