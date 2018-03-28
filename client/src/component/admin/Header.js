import React, { Component } from 'react';
import { Menu, Icon ,Button} from 'antd';
import { HashRouter , Route ,Link} from 'react-router-dom'
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
      }
      this.setState({f : true})
    });
  }
  render() {
    const loginInfo = this.props.state.loginInfo;
    return (
      <div >
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="main">
              <Link to ='/admin'><Icon type="appstore" />main</Link>
            </Menu.Item> 

            <Menu.Item key="customer"><Link to ='/admin/customerMain'><Icon type="user" />customer</Link></Menu.Item>
           

            <Menu.Item key="worker"><Link to ='/admin/workerMain'><Icon type="user" style={{color : 'blue'}}/>worker</Link></Menu.Item>

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
      dispatch({type : 'LOGOUT'});
    },
  }
}
const HeadConnected = connect(mapStateToProps,mapDispatchToProps)(Head);

export default HeadConnected;