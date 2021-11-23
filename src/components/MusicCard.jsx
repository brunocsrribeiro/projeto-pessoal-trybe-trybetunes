import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  render() {
    const {
      music: { trackName, previewUrl },
    } = this.props;

    const { loading } = this.state;
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.instanceOf(Object).isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
