import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction.js'
import AddSong_Transaction from '../transactions/AddSong_Transaction.js'
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction.js'
import EditSong_Transaction from '../transactions/EditSong_Transaction.js'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    DELETE_LIST_MODAL: "DELETE_LIST_MODAL",
    CLOSE_MODAL: "CLOSE_MODAL",
    EDIT_SONG_MODAL: "EDIT_SONG_MODAL",
    DELETE_SONG_MODAL: "DELETE_SONG_MODAL",
}
const currentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG: "EDIT_SONG",
    DELETE_SONG: "DELETE_SONG"
}
// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listForDeletion: null,
        currentModal: currentModal.NONE,
        editMode: false,
        songForEdit: null,
        songForDelete: null,
        hasModal: false,
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion: null,
                    currentModal: currentModal.NONE,
                    editMode: false,
                    songForEdit: null,
                    songForDelete: store.songForDelete,
                    hasModal: false,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion: null,
                    currentModal: currentModal.NONE,
                    editMode: false,
                    songForEdit: null,
                    songForDelete: store.songForDelete,
                    hasModal: false,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listForDeletion: null,
                    currentModal: currentModal.NONE,
                    editMode: true,
                    songForEdit: null,
                    songForDelete: store.songForDelete,
                    hasModal: false,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion: null,
                    currentModal: currentModal.NONE,
                    editMode: false,
                    songForEdit: null,
                    songForDelete: null,
                    hasModal: false,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion: null,
                    currentModal: currentModal.NONE,
                    editMode: false,
                    songForEdit: null,
                    songForDelete: null,
                    hasModal: false,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listForDeletion: null,
                    currentModal: currentModal.NONE,
                    editMode: false,
                    songForEdit: null,
                    songForDelete: null,
                    hasModal: false,
                });
            }
            //READY FOR DELETE LIST MODAL
            case GlobalStoreActionType.DELETE_LIST_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion: payload,
                    currentModal: currentModal.DELETE_LIST,
                    editMode: false,
                    songForEdit: null,
                    songForDelete: null,
                    hasModal: true,
                })
            }
            //READY FOR EDIT SONG MODAL
            case GlobalStoreActionType.EDIT_SONG_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion: null,
                    currentModal: currentModal.EDIT_SONG,
                    editMode: false,
                    songForEdit: payload,
                    songForDelete: null,
                    hasModal: true,
                })
            }
            //READY FOR DELETE SONG MODAL
            case GlobalStoreActionType.DELETE_SONG_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion: null,
                    currentModal: currentModal.DELETE_SONG,
                    editMode: false,
                    songForEdit: null,
                    songForDelete: payload,
                    hasModal: true,
                })
            }
            case GlobalStoreActionType.CLOSE_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listForDeletion: null,
                    currentModal: currentModal.NONE,
                    editMode: false,
                    songForEdit: null,
                    songForDelete: null,
                    hasModal: false,
                })
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
                store.hasModal = false;
            }
        }
        asyncChangeListName(id);
    }
    store.moveSong = function(target,source){
        async function asyncMoveSong(){
            let response = await api.getPlaylistById(store.currentList._id);
            if(response.data.success){
                let playlist = response.data.playlist
                let sourceSong = playlist.songs[source]
                playlist.songs[source] = playlist.songs[target]
                playlist.songs[target] = sourceSong
                console.log("Inside moveSong")
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncMoveSong();
    }
    store.editSongAt = function(index, newSong) {
        async function asyncEditSong(){
            console.log("inside editSongAt")
            let response = await api.getPlaylistById(store.currentList._id);
            if(response.data.success){
                let playlist = response.data.playlist;
                let song = playlist.songs[index];
                song.title = newSong.title;
                song.artist = newSong.artist;
                song.youTubeId = newSong.youTubeId;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
                store.closeModal("edit-song-modal")
            }
        }
        asyncEditSong()
    }
    store.deleteSongAt = function(index){
        console.log("deleteSongAt", index)
        async function asyncDeleteSong(){
            let response = await api.getPlaylistById(store.currentList._id);
            if(response.data.success) {
                let playlist = response.data.playlist;
                playlist.songs.splice(index, 1);
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
                store.closeModal("delete-song-modal")
            }
        }
        asyncDeleteSong()
    }
    store.deletePlaylist = function () {
        async function asyncDeletePlaylist() {
            console.log("Inside deletePlaylist")
            console.log(store.listForDeletion)
            const response = await api.deletePlaylistById(store.listForDeletion._id);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.DELETE_LIST,
                    payload: null
                });
                store.closeModal("delete-list-modal")
                store.loadIdNamePairs();
            }   
        }
        asyncDeletePlaylist();
    }
    store.createNewList = function () {
        async function asyncCreateNewList() {
            let name = "Untitled" + (store.newListCounter+1);
            const response = await api.createPlaylist({name: name, songs: []})
            if (response.data.success){
                let playlist = response.data.playlists;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_LIST,
                        payload: playlist
                    })
                    store.newListCounter += 1
                    store.loadIdNamePairs()
                }
            }
        }
        asyncCreateNewList()
    }
    //MARKING SONGS & LISTS FOR FUNCTIONS
    store.markListForDeletion = function(id) {
        console.log("inside markListForDeletion", id);
        storeReducer({
            type: GlobalStoreActionType.DELETE_LIST_MODAL,
            payload: id
        })
        console.log(id)
        console.log(store.listForDeletion)
    }
    store.markSongForEdit = function(song_and_index) {
        console.log("inside markSongForEdit", song_and_index)
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG_MODAL,
            payload: song_and_index
        })
    }
    store.markSongForDeletion = function (song_and_index) {
        console.log("inside markSongForDeletion", song_and_index)
        storeReducer({
            type: GlobalStoreActionType.DELETE_SONG_MODAL,
            payload: song_and_index
        })
    }
    //METHOD FUNCTIONS FOR VARIABLE INFORMATION
    store.getSongMarkedForEdit = function (){
        if(store.songForEdit){
            return store.songForEdit.song;
        }
    }
    store.getSongMarkedForEditIndex = function (){
        if(store.songForEdit){
            return store.songForEdit.index;
        }
    }
    store.getSongMarkedForDeletion = function (){
        if(store.songForDelete){
            return store.songForDelete.song;
        }
        else
            return "unknown"
    }
    store.getSongMarkedForDeletionIndex = function (){
        if(store.songForDelete){
            return store.songForDelete.index;
        }
    }
    store.getListMarkedForDeletion = function() {
        if(store.listForDeletion) {
            return store.listForDeletion.name;
        }
    }
    //CHECKS IF THE MODALS SHOULD BE OPEN
    store.isDeleteListModalOpen = () => {
        console.log("inside isDeleteListModalOpen")
        return store.currentModal === currentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === currentModal.EDIT_SONG;
    }
    store.isDeleteSongModalOpen = () => {
        return store.currentModal === currentModal.DELETE_SONG;
    }
    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }
    store.closeModal = (modal) => {
        document.getElementById(modal).classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.CLOSE_MODAL,
            payload: null,
        })
    }
    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    //not sure if needed yet
    store.hasTransactionToRedo = function (){
        return tps.hasTransactionToRedo()
    }
    store.hasTransactionToUndo = function () {
        return tps.hasTransactionToUndo()
    }
    //lonely boy
    store.addSong = function (index,song) {
        async function asyncAddSong() {
            let response = await api.getPlaylistById(store.currentList._id);
            if(response.data.success){
                let playlist = response.data.playlist
                console.log(playlist)
                playlist.songs.splice(index, 0, song)
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncAddSong()
    }
    //TRANSACTIONS
    store.addMoveSongTransaction = function (source, target) {
        let transaction = new MoveSong_Transaction(store, source, target);
        tps.addTransaction(transaction);
        console.log("move song transaction added")
    }
    store.addSongTransaction = function (index, song) {
        let transaction = new AddSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addDeleteSongTransaction = function (index, song) {
        let transaction = new DeleteSong_Transaction(store, index, song)
        tps.addTransaction(transaction);
    }
    store.addEditSongTransaction = function (index, oldSong, newSong){
        let transaction = new EditSong_Transaction(store, index, oldSong, newSong)
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}