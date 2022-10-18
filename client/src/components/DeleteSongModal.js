import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleConfirmModal(event){
        event.stopPropagation();
        store.addDeleteSongTransaction(store.getSongMarkedForDeletionIndex(), store.getSongMarkedForDeletion());
        //store.deleteSongAt(store.getSongMarkedForDeletionIndex())
    }

    function handleCancelModal(event){
        event.stopPropagation();
        store.closeModal("delete-song-modal");
    }

    let song = store.getSongMarkedForDeletion();
    console.log(song)
    let songTitle = song.title
    
    let modal = 
    <div 
        className="modal" 
        id="delete-song-modal" 
        data-animation="slideInOutLeft">
            <div className="modal-dialog" id='verify-delete-song-root'>
                <div className="modal-north">
                    Delete Song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to remove {songTitle} from the playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" 
                        id="delete-song-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirmModal}
                        value='Confirm' />
                    <input type="button" 
                        id="delete-song-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancelModal}
                        value='Cancel' />
                </div>
            </div>
    </div>

    if (store.isDeleteSongModalOpen()) {
        document.getElementById("delete-song-modal").classList.add("is-visible");
    }

    return (modal);
}
export default DeleteSongModal;