import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, initindex, initOldSong, initNewSong) {
        super();
        this.store = store;
        this.index = initindex;
        this.oldSong = initOldSong;
        this.newSong = initNewSong;
    }

    doTransaction() {
        console.log("Inside do transaction")
        this.store.editSongAt(this.index, this.newSong);
    }
    
    undoTransaction() {
        console.log("Inside undo transaction")
        this.store.editSongAt(this.index, this.oldSong);
    }
}