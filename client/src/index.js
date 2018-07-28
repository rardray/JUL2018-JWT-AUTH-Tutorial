import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CookiesProvider><Router><Route path = '/' component = {App} /></Router></CookiesProvider>, document.getElementById('root'));
registerServiceWorker();
