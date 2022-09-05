import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import ProjectList from "./components/Ptoject";
import ToDoList from "./components/ToDo";
import NotFound404 from "./components/NotFound404";
import axios from "axios";
import {HashRouter, Link, Route, Switch} from "react-router-dom";



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

    axios.get('http://127.0.0.1:8000/api/project/').then(response =>{

       this.setState(
        {
          'projects':response.data
        }
    )
    }).catch(error => console.log(error))

  axios.get('http://127.0.0.1:8000/api/todo/').then(response =>{

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
          <HashRouter>
              <nav>
                  <ul>
                      <li><Link to='/'>Users</Link></li>
                      <li><Link to='/proj'>Projects</Link></li>
                      <li><Link to='/todos'>Todos</Link></li>
                  </ul>
              </nav>
              <Switch>
                 <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                 <Route exact path='/proj' component={() => <ProjectList projects={this.state.projects}/>}/>
                 <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}/>}/>
                 <Route component={NotFound404}/>
              </Switch>
          </HashRouter>
      </div>
    )
  }
}

export default App;