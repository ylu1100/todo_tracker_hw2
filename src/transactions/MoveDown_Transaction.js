'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR CHANGE POSITION. ITEM=INDEX
export default class MoveDown extends jsTPS_Transaction {
    constructor(newItem,initModel) {
        super();
        this.newItem=newItem;
        this.model=initModel
    }

    doTransaction() {
        this.model.moveItemDown(this.newItem)
    }

    undoTransaction() {
        this.model.moveItemUp(this.newItem+1)
    }
}