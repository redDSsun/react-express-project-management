import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { HashRouter , Route ,Link,Redirect} from 'react-router-dom'
import {Provider,connect} from 'react-redux';
import {login,loadProject} from '../action/action.js';	
import HeadConnected from './worker/Head';
import WorkerMainListConnected from './worker/WorkerMainList'
import EditWorkerConnected from './worker/EditWorker'
import ChangepasswordConnected from './worker/Changepassword'

class WorkerMain extends Component{
	render(){
		if (this.props.state.loginInfo.loginIdendity === undefined
	          || this.props.state.loginInfo.loginIdendity !== 'worker'
	      ) {  
	      return (<Redirect push to="/" />); 
	    } 
	    return (
			<HashRouter>
				<div>
				  	<HeadConnected />
					<Route exact path = '/worker' component={WorkerMainListConnected} />
					<Route path = '/worker/editworker' component={EditWorkerConnected} />
					<Route path = '/worker/changepassword' component = {ChangepasswordConnected} />
				</div>
			</HashRouter>
		);
	}
}




const mapStateToProps = (state) => {
  return {state : state};
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginHandler: (loginIdendity,loginId,timestamp) => {
//       dispatch(login(loginIdendity,loginId,timestamp));
//     },
//     loadProjectHandler :(data) => {
//       dispatch(loadProject(data));
//     }
//   }
// }
const WorkerMainConnected = connect(mapStateToProps,null)(WorkerMain);

export default WorkerMainConnected;