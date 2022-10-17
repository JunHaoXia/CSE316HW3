import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ dragActive, setDragActive ] = useState(false);
    const [ dragTo, setDragTo ] = useState(false);
    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    function handleDragStart(event){
        setDragActive(true);
        setDragTo(dragTo);
        event.dataTransfer.setData("song", props.index);
    }
    function handleDragOver(event) {
        event.preventDefault();
        setDragActive(dragActive);
        setDragTo(true);
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDragActive(dragActive);
        setDragTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDragActive(dragActive);
        setDragTo(false);
    }
    function handleDrop(event){
        event.preventDefault();
        let targetId = props.index;
        let sourceId = event.dataTransfer.getData("song")
        store.moveSong(targetId, sourceId)

        setDragActive(false);
        setDragTo(false);
    }
    console.log(song)
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            draggable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop = {handleDrop}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;