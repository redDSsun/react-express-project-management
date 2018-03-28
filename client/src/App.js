import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import LoginConnected from './component/Login.js';
import AdminMainConnected from './component/AdminMain.js';
import WorkerMain from './component/WorkerMain.js';
import CustomerMainConnected from './component/CustomerMain.js';
import ErrorPage from './component/Error.js';
import Regist from './component/Regist.js';
import { HashRouter, Route, Switch} from 'react-router-dom';
import {Provider,connect} from 'react-redux';
import App from './reducer/reducer.js';
import {createStore} from 'redux';
import {login} from './action/action.js';
import CustomerMainList from './component/customer/MainList'
import NewProjectConnected from './component/customer/NewProject'
const store = createStore(App);


class MyApp extends Component { 

  render() {
    return (
    <HashRouter>
      <Switch>
        <Route exact path = '/' component={LoginConnected} />
        <Route path ="/regist" component={Regist} />
        <Route path = '/admin' component={AdminMainConnected} />
        <Route path = '/worker' component={WorkerMain} />
        <Route path = '/customer' component={CustomerMainConnected} />
        <Route path = '/*' component={LoginConnected} />       
      </Switch>
    </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {state : state};
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyApp);
