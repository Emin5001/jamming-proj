import React from 'react';
import ReactDOM from 'react-dom';
import './TrackList.css';
import {Track} from '../Track/Track'

export class TrackList extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <div className="TrackList">
             {this.props.tracks.map((track) => {
                <Track 
                track={track}
                key={track.id}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval}
                />
             })}  
            </div>
        )
    }
}