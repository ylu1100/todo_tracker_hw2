// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
        console.log(this.props.listIndex)
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        if(this.props.listIndex==0){
        return (
            
            <div 
                style={{backgroundColor:'rgb(255,200,25)'}}
                className='todo-list-button'
                onClick={this.handleLoadList}
            >
                {this.props.toDoList.name}<br />
            </div>
        )
        }
        else{
            return (
            
                <div 
                   
                    className='todo-list-button'
                    onClick={this.handleLoadList}
                >
                    {this.props.toDoList.name}<br />
                </div>
            )
        }
    }
}

export default ListLink;