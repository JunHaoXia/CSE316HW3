import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    console.log("inside EditSongModal")
    function handleConfirmModal(event){
        event.stopPropagation();
        let song = store.getSongMarkedForEdit()
        let oldSong = { 
            "title": song.title,
            "artist": song.artist,
            "youTubeId": song.youTubeId
        };

        let newTitle = document.getElementById("edit-song-title").value;
        let newArtist = document.getElementById("edit-song-artist").value;
        let newYouTubeId = document.getElementById("edit-song-youTubeId").value;
        let newSong = { 
            "title": newTitle,
            "artist": newArtist,
            "youTubeId": newYouTubeId
        };
        store.addEditSongTransaction(store.getSongMarkedForEditIndex(), oldSong, newSong);
        //store.editSongAt(store.getSongMarkedForEditIndex(),newSong)
    }

    function handleCancelModal(event){
        event.stopPropagation();
        store.closeModal("edit-song-modal");
    }

    let modal = 
    <div 
        className="modal" 
        id="edit-song-modal" 
        data-animation="slideInOutLeft">
        <div className="modal-dialog" id='verify-edit-song-root'>
            <div className="modal-north">
                Edit Song
            </div>
            <div className="modal-center">
                <div className="modal-center-content">
                    Title: <input class="modal-text-input" type="text" id="edit-song-title" defaultValue=""/><br/>
                    Artist: <input class="modal-text-input" type="text" id="edit-song-artist" defaultValue=""/><br/>
                    YouTubeId: <input class="modal-text-input" type="text" id="edit-song-youTubeId" defaultValue=""/><br/>
                </div>
            </div>
            <div className="modal-south">
                <input type="button" 
                    id="edit-song-confirm-button" 
                    className="modal-button" 
                    onClick={handleConfirmModal}
                    value='Confirm' />
                <input type="button" 
                    id="edit-song-cancel-button" 
                    className="modal-button" 
                    onClick={handleCancelModal}
                    value='Cancel' />
            </div>
        </div>
    </div>

    if (store.isEditSongModalOpen()) {
        document.getElementById("edit-song-modal").classList.add("is-visible");
        let song = store.getSongMarkedForEdit()
        console.log(song.title)
        document.getElementById("edit-song-title").value = song.title;
        document.getElementById("edit-song-artist").value = song.artist;
        document.getElementById("edit-song-youTubeId").value = song.youTubeId;
    }
    console.log("about to return modal")
    return (modal);
}
export default EditSongModal;