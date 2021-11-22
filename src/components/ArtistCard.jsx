import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ArtistCard extends Component {
  render() {
    const {
      artistName,
      collectionName,
      collectionId,
      artwordUrl100,
    } = this.props;
    return (
      <div>
        <div>
          <h3>{ collectionName }</h3>
          <img src={ artwordUrl100 } alt={ artistName } />
          <span>{ artistName }</span>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          />
        </div>
      </div>
    );
  }
}

ArtistCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  artwordUrl100: PropTypes.string.isRequired,
};
