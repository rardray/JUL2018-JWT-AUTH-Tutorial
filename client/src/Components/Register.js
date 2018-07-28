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
import {registerUser} from './Actions/actions'
const REGISTER = 'register'
function log(state, props) {
    return {
      authenticated: true
    }
  }
class Register extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    constructor(props) {
        super(props)
        const {cookies} = props
        this.defaultState = {email: '', firstName: '', lastName: '', password: ''}
        this.registerUser = registerUser.bind(this)
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
        const {email, firstName, lastName, password } = this.state
        this.props.loginUser(this.state, REGISTER, log)
    }
    render() {
        return (
            <div>
                <form onSubmit = {this.handleSubmit} >
                <input name = 'email' type = 'text' value = {this.state.email} onChange = {this.handleChange} />
                <input name = 'firstName' type = 'text' value = {this.state.firstName} onChange = {this.handleChange} />
                <input name = 'lastName' type = 'text' value = {this.state.lastName} onChange = {this.handleChange} />
                <input name = 'password' type = 'password' value = {this.state.password} onChange = {this.handleChange} />
                <input name = 'register' type = 'submit' />
                </form>
                </div>
        )
    }
}

export default withCookies(Register)