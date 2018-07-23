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

const API_URL = 'http://localhost:3001/api'

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state ={error: '', message: '', content: '', authenticated: false, name: cookies.get('firstName') || 'Joe' }
  }
  
  loginUser = (email, password) => {
    const { cookies } = this.props
    axios.post(`${API_URL}/auth/login`, {email: email, password: password} )
    .then(response => {
        cookies.set('firstName', response.data.user.firstName, {path: '/'}).then(()=> this.setState({authenticated: true}))
    })
    
    .catch(err => err)

  }
  render() {
    const { name } = this.state
    return (
      <Router>
      <div className="App"> 
      <p>{name}</p>
        <Route exact path = '/login' children = {(props) => <Login {...props} loginUser = {this.loginUser} />} />
      </div>
      </Router>
    );
  }
}

export default withCookies(App);