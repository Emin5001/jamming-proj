import React from 'react';
import ReactDOM from 'react-dom';

export class Playlist extends React.Component {
    render() {
        return (
            <div class="Playlist">
                <input value=''/>
                {/*Add tracklist component */}
                <button class="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}