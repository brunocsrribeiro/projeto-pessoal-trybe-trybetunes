import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      loading: false,
      musics: [],
      myFavoriteTracks: [],
    };

    this.onHandleMusics = this.onHandleMusics.bind(this);
    this.onGetFavorites = this.onGetFavorites.bind(this);
    this.onSongs = this.onSongs.bind(this);
  }

  componentDidMount() {
    this.onHandleMusics();
    this.onGetFavorites();
  }

  componentDidUpdate() {
    this.onGetFavorites();
  }

  async onHandleMusics() {
    const { match: { params: { id } } } = this.props;

    this.setState({
      loading: true,
    });

    const track = await getMusics(id);
    const {
      artistName,
      collectionName,
    } = track[0];

    if (track.length > 0) {
      this.setState({
        artistName,
        collectionName,
        musics: track,
        loading: false,
      });
    }
  }

  async onGetFavorites() {
    const myFavorite = await getFavoriteSongs();

    this.setState(() => ({
      myFavoriteTracks: myFavorite,
    }));
  }

  async onSongs(myMusic) {
    const { myFavoriteTracks } = this.state;
    const isFavorite = myFavoriteTracks.some((song) => song.trackId === myMusic.trackId);

    this.setState({
      loading: true,
    });

    if (!isFavorite) {
      await addSong(myMusic);
      this.setState({
        loading: false,
      });
    } else {
      await removeSong(myMusic);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const {
      loading,
      musics,
      myFavoriteTracks,
      artistName,
      collectionName,
    } = this.state;

    return (
      <>
        <div data-testid="page-album">
          <Header />
          <h1
            data-testid="artist-name"
          >
            { artistName }
          </h1>
          <h2
            data-testid="album-name"
          >
            { collectionName }
          </h2>
        </div>
        <div>
          { loading
            ? <Loading />
            : (
              musics
                .filter((tracks) => tracks.trackName && tracks.previewUrl)
                .map((music) => (
                  <div key={ music.trackId }>
                    <MusicCard
                      key={ music.trackId }
                      favoriteSong={ myFavoriteTracks
                        .some((song) => song.trackId === music.trackId) }
                      funcFavorites={ () => this.onSongs(music) }
                      { ...music }
                    />
                  </div>
                ))
            )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default Album;
