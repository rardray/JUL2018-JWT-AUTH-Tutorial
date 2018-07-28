import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './stylesheets/App.css';
import axios from 'axios'
import Login from './Login'
import Dashboard from './Dashboard'
import Register from './Register'
import {loginUser} from './Actions/actions'

const API_URL = 'http://localhost:3001/api'

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state ={user: cookies.get('user') || [], error: '', message: '', content: '', authenticated: false}
    this.loginUser = loginUser.bind(this)
  }
  componentDidUpdate() {
    console.log(this.state.authenticated)
    console.log(this.state)
  }

  render() {
    const { firstName, lastName } = this.state.user
    return (
      <div className="App"> 
      <p>{firstName} {lastName}</p>
        <Route exact path = '/login' render = {(props) => <Login {...props} loginUser = {this.loginUser} />} />
        <Route exact path = '/register' render = {(props) => <Register {...props} loginUser = {this.loginUser} />} />
        <Route path = '/dashboard' component = {Dashboard} />
      </div>
    );
  }
}

export default withCookies(App);