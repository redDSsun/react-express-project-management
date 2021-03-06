import React, { Component } from 'react';
import { Menu, Icon ,Button} from 'antd';
import { HashRouter , Route ,Link,Redirect} from 'react-router-dom'
import CustomerMainList from '../customer/MainList'
import NewProjectConnected from '../customer/NewProject'
import {login,loadProject} from '../../action/action.js';
import {Provider,connect} from 'react-redux';

const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class Head extends Component {
  state = {
    current: 'main',
    f : false
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    },function(){
      if(this.state.current === 'logout'){
        console.log("====logout");
        this.props.logoutHandler();
        this.setState({f : true})
      }else{
        console.log('no logout')
      }
      
    });
  }
  render() {
    const loginInfo = this.props.state.loginInfo;

    if (this.state.f === true) 
    {  
      return (<Redirect push to="/" />); 
    } 
    return (
      <div>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="main">
              <Link to ='/worker'><Icon type="appstore" />main</Link>
            </Menu.Item>
            <Menu.Item key="edit">
              <Link to ='/worker/editworker'><Icon type="user" />edit</Link>
            </Menu.Item>
            <Menu.Item key="change_password">
              <Link to ='/worker/changepassword'><Icon type="user" />change password</Link>
            </Menu.Item>
            <SubMenu title={<span><Icon type="user" />welcome {this.props.state.loginInfo.loginIdendity}:{this.props.state.loginInfo.loginName}</span>}
                      style={{
                float:'right',
                margin: '10px'
              }}
            >
               <Menu.Item key="logout" ><Button type="primary" size="small" >log out</Button> </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {state : state};
}
const mapDispatchToProps = (dispatch) => {
  return {
    logoutHandler: () => {
      console.log('logout')
      dispatch({type : 'LOGOUT'});
    }
  }
}
const HeadConnected = connect(mapStateToProps,mapDispatchToProps)(Head);

export default HeadConnected;

