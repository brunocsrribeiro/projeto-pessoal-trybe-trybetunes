import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ArtistCard extends Component {
  render() {
    const {
      artistName,
      collectionName,
      collectionId,
      artworkUrl100,
    } = this.props;
    return (
      <div>
        <div>
          <h3>{ collectionName }</h3>
          <img src={ artworkUrl100 } alt={ artistName } />
          <span>{ artistName }</span>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            Músicas
          </Link>
        </div>
      </div>
    );
  }
}

ArtistCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};
