import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import ProjectList from "./components/Ptoject";
import ToDoList from "./components/ToDo";
import axios from "axios";
import {HashRouter, Route} from "react-router-dom";



class App extends  React.Component{
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': []
    }
  }


  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(response =>{

       this.setState(
        {
          'users':response.data
        }
    )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projets/').then(response =>{

       this.setState(
        {
          'projects':response.data
        }
    )
    }).catch(error => console.log(error))

  axios.get('http://127.0.0.1:8000/api/todos/').then(response =>{

       this.setState(
        {
          'todos':response.data
        }
    )
    }).catch(error => console.log(error))
  }


  render() {
    return (
      <div>
         <UserList users={this.state.users}/>
         <ProjectList projets={this.state.projects}/>
         <ToDoList todos={this.state.todos}/>
      </div>
    )
  }
}

export default App;