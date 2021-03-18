// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import Select from '@material-ui/core/Select';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
        this.state={
            changeDesc:false,
            changeDate:false,
            changeStatus:false,
            currentStatus:this.props.toDoListItem.status,
            
        }
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }
    changeDescription=()=>{
       console.log(this.props.toDoListItem)
        this.setState({
            changeDesc:true,
            changeStatus:false,
            changeDate:false,
        })
    }
    changeDate=()=>{
        this.setState({
            changeDesc:false,
            changeStatus:false,
            changeDate:true,
        })
    }
    changeStatus=()=>{
        this.setState({
            changeDesc:false,
            changeStatus:true,
            changeDate:false,
        })
    }
    setNewDesc=(event)=>{
        if(event.target.value!== this.props.toDoListItem.description){
        this.props.toDoListItem.description=event.target.value
        }
        this.setState({
            changeDesc:false,
            changeStatus:false,
            changeDate:false,
        })
       
    }
    setNewDate=(event)=>{
        
        if(event.target.value!== this.props.toDoListItem.due_date&&event.target.value!==""){
        this.props.toDoListItem.due_date=event.target.value
        }
        this.setState({
            changeDesc:false,
            changeStatus:false,
            changeDate:false,
        })
    }
    blurAllInputs=()=>{
        this.setState({
            changeDesc:false,
            changeStatus:false,
            changeDate:false,
        })
    }
    setStatus=()=>{
       if(this.state.currentStatus==='complete'){
           this.props.toDoListItem.status='incomplete'
           this.setState({
               currentStatus:'incomplete'
           })
       }
       else{
        this.props.toDoListItem.status='complete'
        this.setState({
            currentStatus:'complete'
        })
        
       }
    }
    render() {
        // DISPLAY WHERE WE ARE
        
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
            
                
                {this.state.changeDesc?  
                <div className='item-col task-col item-desc-input'>
                    <input onBlur={this.setNewDesc} defaultValue={listItem.description} autoFocus></input>
                </div>
                :
                <div className='item-col task-col' style={{overflow:'hidden',textOverflow:'ellipsis'}} onClick={this.changeDescription}>{listItem.description}</div>
                }
                
                {!this.state.changeDate?  
                <div className='item-col due-date-col' onClick={this.changeDate} >{listItem.due_date}</div>
                :
                <div className='item-col task-col item-date-input'>
                <input type='date' onBlur={this.setNewDate} defaultValue={listItem.due_date}  autoFocus></input>
                </div>
                }

                {!this.state.changeStatus?  
                <div  className='item-col status-col' onClick={this.changeStatus} className={statusType}>{listItem.status}</div>
                :
                <div className='item-col task-col item-status-input'>
                {/* <input onBlur={this.blurAllInputs} autoFocus></input> */}
                <Select
                    style={{color:'white'}}
                    onBlur={this.blurAllInputs}
                    value={this.state.currentStatus}
                    onChange={this.setStatus}
                    autoFocus>
                    
                <option  style={{cursor:'pointer'}} value='complete'>Completed</option>
                <option   style={{cursor:'pointer'}} value='incomplete'>Incomplete</option>
                </Select>
                </div>
                }
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                {this.props.index==0?
                    <KeyboardArrowUp  className='list-item-control todo-button button-disabled' />
                    :
                    <KeyboardArrowUp onClick={()=>{this.props.moveItemUp(this.props.index)}} className='list-item-control todo-button' />
                } 
                {this.props.index==this.props.listLength-1?
                    <KeyboardArrowDown className='list-item-control todo-button button-disabled' />
                    :
                    <KeyboardArrowDown onClick={()=>{this.props.moveItemDown(this.props.index)}} className='list-item-control todo-button' />
                }    
                    <Close onClick={()=>{this.props.deleteItem(this.props.index)}} className='list-item-control todo-button' />
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;