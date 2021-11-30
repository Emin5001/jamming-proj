import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {SearchResults} from './Components/SearchResults/SearchResults';
import {Playlist} from './Components/Playlist/Playlist';
import {SearchBar} from './Components/SearchBar/SearchBar';
import {Spotify} from './util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Lion King on Ice',
          artist: 'J-Cole',
          album: 'N/A',
          id: 1
        },

        {
          name: 'Tuscan Leather',
          artist:'Drake',
          album: 'Never Was The Same',
          id: 2,
        }, 

        {
          name: 'Moonlight Sonata, First Movement',
          artist: 'Beethoven',
          album: '1800 Piano Bangers',
          id: 3,
        }
      ],
      playlistName: '',
      playlistTracks: [
        {
          name: 'Sample Song Name',
          artist:'Sample Artist Name',
          album:'Sample Album Name',
          id: 4,
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      alert('You already have this song inside of your playlist.')
      return;
    } else {
      this.state.playlistTracks.push(track);
    }
  }

  removeTrack(track) {
    this.setState({ //removes track that has the track.id
      playlistTracks: this.state.playlistTracks.filter((tracksInPlaylist) => tracksInPlaylist.id !== track.id)
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    })
  }

  savePlaylist() {
    let trackURIs = this.state.playlistName.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: '',
        playlistTracks: '',
      })
    });

  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({
        searchResults: searchResults,
      })
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
          onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults
            searchResults={this.state.searchResults} 
            onAdd={this.addTrack}
            />
            <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.props.savePlaylist}
            />
          </div>
        </div>
      </div>
    );  
  }

}

export default App;
