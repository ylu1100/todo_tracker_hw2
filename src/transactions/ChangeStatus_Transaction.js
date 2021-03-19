'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR CHANGE DESCRIPTION
export default class ChangeStatus extends jsTPS_Transaction {
    constructor(oldItem,newItem,initModel) {
        super();
        this.oldItem=oldItem;
        this.newItem=newItem;
        this.model=initModel
    }

    doTransaction() {
        this.model.changeTaskStatus(this.newItem)
    }

    undoTransaction() {
        this.model.changeTaskStatus(this.oldItem)
    }
}