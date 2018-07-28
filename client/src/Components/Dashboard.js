import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    withRouter
  } from 'react-router-dom';
  import { instanceOf } from 'prop-types';
  import { withCookies, Cookies } from 'react-cookie';

class Dashboard extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    constructor(props) {
        super(props)
        const {cookies} = props 
    }
    render() {
        const {cookies} = this.props
        const { firstName, lastName } = cookies.get('user')
        return (
            <div>
                <h4>welcome {firstName} {lastName} </h4>
                </div>
        )
    }
}

export default withCookies(Dashboard)