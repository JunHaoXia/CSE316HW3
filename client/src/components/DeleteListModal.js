import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteListModal() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleConfirmModal(event){
        event.stopPropagation();
        store.deletePlaylist();
    }
    
    function handleCancelModal(event){
        event.stopPropagation();
        store.closeModal("delete-list-modal");
    }
    
    let name = store.getListMarkedForDeletion();

    let modal = 
    <div 
        className="modal" 
        id="delete-list-modal" 
        data-animation="slideInOutLeft">
            <div className="modal-dialog" id='verify-delete-list-root'>
                <div className="modal-north">
                    Delete playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">           
                        Are you sure you wish to permanently delete the {name} playlist? 
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" 
                        id="delete-list-confirm-button" 
                        className="modal-button" 
                        onClick={handleConfirmModal}
                        value='Confirm' />
                    <input type="button" 
                        id="delete-list-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancelModal}
                        value='Cancel' />
                </div>
            </div>
    </div>

    if (store.isDeleteListModalOpen()) {
        document.getElementById("delete-list-modal").classList.add("is-visible");
    }

    return (modal);
}
export default DeleteListModal;