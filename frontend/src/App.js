import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import ProjectList from "./components/Ptoject";
import ToDoList from "./components/ToDo";
import NotFound404 from "./components/NotFound404";
import LoginForm from "./components/Auth";
import axios from "axios";
import Cookies from "universal-cookie";
import {HashRouter, Link, Route, Switch} from "react-router-dom";



class App extends  React.Component{
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': '',
    }
  }

  logout(){
      this.set_token('')
  }

  is_auth(){
      return !!this.state.token
  }

  set_token(token){
      const cookies = new Cookies()
      cookies.set('token', token)
      this.setState({'token': token}, ()=>this.load_data())
  }

  get_token_from_storage(){
      const cookies = new Cookies()
      const token = cookies.get('token')
      this.setState({'token':token}, ()=>this.load_data())
  }


  get_token(username, password){
      const data = {username:username, password:password}
      axios.post('http://127.0.0.1:8000/api-token-auth/',data).then(response => {
          this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  load_data(){
      const headers = this.get_headers()
      axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(response => {

          this.setState(
              {
                  'users': response.data
              }
          )
      }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/project/', {headers}).then(response => {

          this.setState(
              {
                  'projects': response.data.results
              }
          )
      }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(response => {

          this.setState(
              {
                  'todos': response.data.results
              }
          )
      }).catch(error => console.log(error))
  }

  get_headers(){
      let headers = {
          'Content-Type': 'application/json'
      }
      if(this.is_auth()){
          headers['Authorization'] = 'Token' + this.state.token
      }
      return headers
  }

  componentDidMount() {
      this.get_token_from_storage()
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
                      <li>
                          {this.is_auth() ? <button onClick={() => this.logout()}>Logout </button>: <Link to='/login'>Login</Link>}
                      </li>
                  </ul>
              </nav>
              <Switch>
                 <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                 <Route exact path='/proj' component={() => <ProjectList projects={this.state.projects}/>}/>
                 <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}/>}/>
                 <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username,password)}/>}/>
                 <Route component={NotFound404}/>
              </Switch>
          </HashRouter>
      </div>
    )
  }
}

export default App;