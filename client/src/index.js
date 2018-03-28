import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import LoginConnected from './component/Login.js';
import AdminMain from './component/AdminMain.js';
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
import MyApp from './App'
const store = createStore(App);


ReactDOM.render(
	<Provider store = {store} >
		<MyApp />
	</Provider>	
	, document.getElementById('root'));
registerServiceWorker();
