// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
        this.state={
            changeName:false
        }
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
        console.log(this.props.listIndex)
    }
    openChangeListNameInput=()=>{
        this.setState({
            changeName:true
        })
    }
    changeListName=(event)=>{
        this.props.toDoList.name=event.target.value
        this.setState({
            changeName:false
        })
    }
    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        if(this.props.listIndex==0 && this.props.listDisplayed){
        return (
            
            <div 
                onDoubleClick={this.openChangeListNameInput}
                style={{backgroundColor:'rgb(255,200,25)'}}
                className='todo-list-button'
                onClick={this.handleLoadList}
            >
            
                {this.state.changeName?
                    <input autoFocus defaultValue={this.props.toDoList.name} onBlur={this.changeListName}></input>
                    :
                    this.props.toDoList.name}<br />
            </div>
        )
        }
        else{
            return (
            
                <div 
                    ondblclick={()=>console.log(1)}
                    className='todo-list-button'
                    onClick={this.handleLoadList}
                >
                    {this.state.changeName?
                    <input autoFocus defaultValue={this.props.toDoList.name} onBlur={this.changeListName}></input>
                    :
                    this.props.toDoList.name}<br />
                </div>
            )
        }
    }
}

export default ListLink;