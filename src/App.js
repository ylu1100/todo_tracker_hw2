// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recent_work");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true,
      deleteConfirmationOpen:false,
      listDisplayed:false,
      
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);
    this.tps.clearAllTransactions()
    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    //console.log(nextLists)
    nextLists.unshift(toDoList);
     // console.log(this.state.toDoLists)
      //console.log(nextLists)
      
    this.setState({
      listDisplayed:true,
      toDoLists: nextLists,
      currentList: toDoList
    }, this.afterToDoListsChangeComplete);
    
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];
    console.log(newToDoListsList)
    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }
 
  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }
  
 
  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }
  closeList=()=>{
    this.tps.clearAllTransactions()
    this.setState({
      listDisplayed:false,
      currentList:{items:[]},
    })
  }
  deleteList=()=>{
    let temp=this.state.toDoLists
    temp.splice(0,1)
    this.tps.clearAllTransactions()
    this.setState({
      listDisplayed:false,
      toDoLists:temp,
      currentList:{items:[]},
      deleteConfirmationOpen:false,
      
    })
    this.afterToDoListsChangeComplete()
  }
  openDeleteConfirmation=()=>{
    this.setState({
      deleteConfirmationOpen:true
    })
  }
  closeDeleteConfirmation=()=>{
    this.setState({
      deleteConfirmationOpen:false
    })
  }
  
  render() {
    let items = this.state.currentList.items;
    return (
      <div  id="root">
        <Navbar />
        <LeftSidebar 
          listDisplayed={this.state.listDisplayed}
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          afterToDoListsChangeComplete={this.afterToDoListsChangeComplete}
        />
        <Workspace 
        
        listDisplayed={this.state.listDisplayed}
        tps={this.tps}
        makeNewToDoListItemCallback={this.makeNewToDoListItem}
        toDoListItems={items} 
        closeListCallBack={this.closeList}
        deleteListCallBack={this.openDeleteConfirmation}
        afterToDoListsChangeComplete={this.afterToDoListsChangeComplete}
        />
        <Dialog
          open={this.state.deleteConfirmationOpen}
          >
          <DialogTitle>Are you sure you want to delete this list?</DialogTitle>
          <DialogActions>
            <Button onClick={this.deleteList}>Delete</Button>
            <Button onClick={this.closeDeleteConfirmation}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;