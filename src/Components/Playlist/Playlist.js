import React from 'react';
import ReactDOM from 'react-dom';
import './Playlist.css'
import {TrackList} from '../Tracklist/TrackList'

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
    }

    handleNameChange() {
        
    }

    render() {
        return (
            <div class="Playlist">
                <input defaultValue={"New Playlist"}/>
                <TrackList 
                tracks={this.props.playlistTracks}
                onRemove={this.props.onRemove}
                isRemoval={true}
                />
                <button class="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}