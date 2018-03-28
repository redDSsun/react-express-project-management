import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { HashRouter , Route ,Link,Redirect} from 'react-router-dom'
import HeadConnected from './admin/Header'
import AdminMainListConnected from './admin/AdminMainList'
import CustomerMainConnected from './admin/CustomerMain'
import WorkerMainConnected from './admin/WorkerMain';
import AssignTaskConnected from './admin/AssignTask'
import Title from './Title'

import {Provider,connect} from 'react-redux';
import {login,loadProject} from '../action/action.js';	




class AdminMain extends Component {
  render() {
    if (this.props.state.loginInfo.loginIdendity === undefined
          || this.props.state.loginInfo.loginIdendity !== 'admin'
      ) {  
      return (<Redirect push to="/" />); 
    } 
    return (
			      <HashRouter>
			       <div>
			      	<HeadConnected />
							<Route exact path = '/admin' component={AdminMainListConnected} />
              <Route path = '/admin/assignTask/:id' component={AssignTaskConnected} />
							<Route path = '/admin/customerMain' component={CustomerMainConnected} />
							<Route path = '/admin/workerMain' component = {WorkerMainConnected} />
						</div>
				  </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {state : state};
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginHandler: (loginIdendity,loginId,timestamp) => {
      dispatch(login(loginIdendity,loginId,timestamp));
    },
    loadProjectHandler :(data) => {
      dispatch(loadProject(data));
    }
  }
}
const AdminMainConnected = connect(mapStateToProps,mapDispatchToProps)(AdminMain);

export default AdminMainConnected;
