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

const API_URL = 'http://localhost:3001/api'

const REGISTER = 'register'
const LOGIN = 'login'
export function loginUser(data, url, value){
    const { cookies } = this.props
    let resData = {}
    axios.post(`${API_URL}/auth/${url}`, data )
    .then(response => {
        cookies.set('token', response.data.token, {path: '/'})
        cookies.set('user',response.data.user, {path: '/'})
        resData = response.data.user 
        this.setState(value(resData))
        this.props.history.push('/dashboard')
        console.log(resData)
      
    })
    
    .catch(err => err)
}

export function registerUser(email, firstName, lastName, password, value) {
    const {cookies} = this.props
    axios.post(`${API_URL}/auth/register`, {email: email, firstName: firstName, lastName: lastName, password: password})
    .then(response => {
        cookies.set('token', response.data.token, {path: '/'})
        cookies.set('user', response.data.user, {path: '/'})
        this.setState(value)
        this.props.history.push('/dashboard')
    })
    .catch(err => err)
}