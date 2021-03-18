// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
        
    }
    moveItemDown=(index)=>{
        console.log(index)
        let temp= this.props.toDoListItems[index+1];
        this.props.toDoListItems[index+1]=this.props.toDoListItems[index]
        this.props.toDoListItems[index]=temp
        this.forceUpdate();
    }
    moveItemUp=(index)=>{
        console.log(index)
        let temp= this.props.toDoListItems[index-1];
        this.props.toDoListItems[index-1]=this.props.toDoListItems[index]
        this.props.toDoListItems[index]=temp
        this.forceUpdate();
    }
    deleteItem=(index)=>{
        this.props.toDoListItems.splice(index,1)
        this.forceUpdate();
    }

    render() {
        
        let index=0;
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" />
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" />
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button" />
                        <Delete onClick={this.props.deleteListCallBack} id="delete-list-button" className="list-item-control material-icons todo-button" />
                        <Close onClick={this.props.closeListCallBack} id="close-list-button" className="list-item-control material-icons todo-button" />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            index={index++}
                            moveItemDown={this.moveItemDown}
                            moveItemUp={this.moveItemUp}
                            deleteItem={this.deleteItem}
                            listLength={this.props.toDoListItems.length}
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}
                                // PASS THE ITEM TO THE CHILDREN
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;