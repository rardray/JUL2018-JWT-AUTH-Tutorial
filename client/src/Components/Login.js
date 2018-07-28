import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios'
import {loginUser} from './Actions/actions'


function log(resData) {
    return {
      authenticated: true, user: resData
    }
  }
  const LOGIN = 'login'
  
class Login extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    constructor(props) {
        super(props)
        const {cookies} = props
        this.defaultState = {email: '', password: ''}
        this.state = this.defaultState
    }

    
    handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.loginUser( this.state, LOGIN, log)
       
    }
    render() {
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                <input name = "email" type = "text" value = {this.state.email} onChange = {this.handleChange.bind(this)}/>
                <input name = "password" type = "password" value = {this.state.password} onChange = {this.handleChange.bind(this)}/>
                <input name = "login" type = "submit" />
                </form>
            </div>
        )
    }
}
export default withCookies(Login)