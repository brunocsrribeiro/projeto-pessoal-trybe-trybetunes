import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import PropTypes from 'prop-types';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: '',
      musics: [],
    };

    this.onHandleMusics = this.onHandleMusics.bind(this);
  }

  componentDidMount() {
    this.onHandleMusics();
  }

  async onHandleMusics() {
    const { match: { params: { id } } } = this.props;

    this.setState({
      loading: true,
    });

    const track = await getMusics(id);

    if (track.length > 0) {
      this.setState({
        musics: track,
        loading: false,
      });
    }
  }

  render() {
    const { loading, musics } = this.state;
    return (
      loading
        ? <Loading />
        : (
          musics.length > 0 && (
            <div data-testid="page-album">
              <Header />
              <h1
                data-testid="artist-name"
              >
                {musics[0].artistName}
              </h1>
              <h2
                data-testid="album-name"
              >
                {musics[0].collectionName}
              </h2>
              <div>
                {
                  musics
                    .filter((tracks) => tracks.trackName && tracks.previewUrl)
                    .map((music) => (
                      <MusicCard
                        key={ music.trackId }
                        music={ music }
                      />
                    ))
                }
              </div>
            </div>
          )
        )
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default Album;
