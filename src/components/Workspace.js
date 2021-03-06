// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import AddNewItem_Transaction from '../transactions/AddNewItem_Transaction'
import MoveDown from '../transactions/MoveDown_Transaction.js'
import ChangePosition from '../transactions/ChangePosition_Transaction.js'
class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state={
            ctrlPressed:false,
            zPressed:false,
            undoPressed:false,
            redoPressed:false,
        }
    }
    moveItemDown=(index)=>{
        console.log(index)
        let temp= this.props.toDoListItems[index+1];
        this.props.toDoListItems[index+1]=this.props.toDoListItems[index]
        this.props.toDoListItems[index]=temp
        this.forceUpdateCallBack()
    }
    moveItemUp=(index)=>{
        console.log(index)
        let temp= this.props.toDoListItems[index-1];
        this.props.toDoListItems[index-1]=this.props.toDoListItems[index]
        this.props.toDoListItems[index]=temp
        this.forceUpdateCallBack()
    }
///////////////////////
    addMoveUpTransaction=(index)=>{
        let transaction = new ChangePosition(index,this)
        this.props.tps.addTransaction(transaction);
    }
    addMoveDownTransaction=(index)=>{
        let transaction = new MoveDown(index,this)
        this.props.tps.addTransaction(transaction);
    }
///////////////////////////
    addNewListItem=()=>{
        this.props.toDoListItems.push(this.props.makeNewToDoListItemCallback())
        console.log(this.props.toDoListItems)
        this.forceUpdateCallBack()
    }
    addBackListItem=(oldItem)=>{
        this.props.toDoListItems.push(oldItem)
        this.forceUpdateCallBack()
    }
    removeItem=(itemToRemove)=>{
        this.props.toDoListItems.splice(this.props.toDoListItems.indexOf(itemToRemove),1)
        this.forceUpdateCallBack()
    }
    addNewItemTransaction=() => {
        let transaction = new AddNewItem_Transaction(this);
        this.props.tps.addTransaction(transaction);
    }
    
    redo=()=>{
        console.log('redo')
        if (this.props.tps.hasTransactionToRedo()) {
            this.props.tps.doTransaction();
            this.forceUpdateCallBack()
        }
    }
    undo=()=>{
        console.log('undo')
        if (this.props.tps.hasTransactionToUndo()) {
            this.props.tps.undoTransaction();
            this.forceUpdateCallBack()
        }
        
    }
    forceUpdateCallBack=()=>{
        this.props.afterToDoListsChangeComplete()
        this.forceUpdate()
    }
    checkKeyEvent=(event)=>{
        if(event.key=='Control'){
          console.log('cpressed')
          this.setState({
            ctrlPressed:true
          })
        }
        if(event.key=='z'){
          console.log('zpressed')
          if(this.state.ctrlPressed){
            this.ctrlZEvent()
          }
        }
        else if(event.key=='y'){
          console.log('ypressed')
          if(this.state.ctrlPressed){
            this.ctrlYEvent()
          }
        }
      }
        
      removeKeyEvent=()=>{
        console.log('fin')
        this.setState({
          ctrlPressed:false,
          undoPressed:false,
          redoPressed:false,
        })
      }
      ctrlZEvent=()=>{
          this.setState({
            undoPressed:true,
            ctrlPressed:false,
          })
          this.undo()
          this.removeKeyEvent()
      }
      ctrlYEvent=()=>{
        this.setState({
          redoPressed:true,
          ctrlPressed:false,
        })
        this.redo()
        this.removeKeyEvent()
      }
    render() {
        
        let index=0;
      
        return (
            <div tabIndex='0'  onKeyDown={this.checkKeyEvent}  id="workspace" >
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        {this.props.tps.getUndoSize()==0?
                            <Undo id="undo-button" className="list-item-control material-icons todo-button button-disabled" />
                        :
                            <Undo onClick={this.undo} id="undo-button" className="list-item-control material-icons todo-button" />
                        }
                        {this.props.tps.getRedoSize()==0?
                            <Redo  id="redo-button" className="list-item-control material-icons todo-button button-disabled" />
                        :
                        <Redo  onClick={this.redo} id="redo-button" className="list-item-control material-icons todo-button" />
                        }
                        {this.props.listDisplayed?
                        <AddBox onClick={this.addNewItemTransaction} id="add-item-button" className="list-item-control material-icons todo-button" />
                        :
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button button-disabled" />
                        }
                        {this.props.listDisplayed?
                        <Delete onClick={this.props.deleteListCallBack} id="delete-list-button" className="list-item-control material-icons todo-button" />
                        :
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button button-disabled" />
                        }
                        {this.props.listDisplayed?
                        <Close onClick={this.props.closeListCallBack} id="close-list-button" className="list-item-control material-icons todo-button" />
                        :
                        <Close  id="close-list-button" className="list-item-control material-icons todo-button button-disabled" />
                        }
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            index={index++}
                            addBackListItem={this.addBackListItem}
                            moveItemDown={this.addMoveDownTransaction}
                            moveItemUp={this.addMoveUpTransaction}
                            removeItem={this.removeItem}
                            tps={this.props.tps}
                            listLength={this.props.toDoListItems.length}
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}
                            forceUpdateCallBack={this.forceUpdateCallBack}    // PASS THE ITEM TO THE CHILDREN
                        />))
                    }
                </div>
               
                <br />
            </div>
        );
    }
}

export default Workspace;