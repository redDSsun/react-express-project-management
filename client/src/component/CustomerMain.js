import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { HashRouter , Route ,Link,Redirect} from 'react-router-dom'
import CustomerMainListConnected from './customer/MainList'
import NewProjectConnected from './customer/NewProject'
import HeadConnected from './customer/Head';
import UserConnected from './customer/User';
import ChangePasswordConnected from './customer/ChangePassword'
import {Provider,connect} from 'react-redux';
import {login,loadProject} from '../action/action.js';	




class CustomerMain extends Component {

  render() {
    if (this.props.state.loginInfo.loginIdendity === undefined
          || this.props.state.loginInfo.loginIdendity !== 'customer'
      ) {  
      return (<Redirect push to="/" />); 
    } 
    return (
			      <HashRouter>
			       <div>
			      	<HeadConnected />
							<Route exact path = '/customer' component={CustomerMainListConnected} />
							<Route path = '/customer/new_project' component={NewProjectConnected} />
							<Route path = '/customer/edituser' component = {UserConnected} />
              <Route path = '/customer/changpassword' component = {ChangePasswordConnected} />
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
const CustomerMainConnected = connect(mapStateToProps,mapDispatchToProps)(CustomerMain);

export default CustomerMainConnected;


