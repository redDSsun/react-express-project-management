import { Form, Input, Icon, Button } from 'antd';
import React, { Component } from 'react';
import {Provider,connect} from 'react-redux';
import '../../node_modules/antd/dist/antd.min.css';
const FormItem = Form.Item;

class Title extends Component {
  render(){
  	console.log(this.props.state.loginInfo.loginIdendity)
  	console.log(this.props.state.loginInfo.loginName)
    return (
      <div>welcome </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {state : state};
}

const TitleConnected = connect(mapStateToProps,null)(Title);


export default TitleConnected;