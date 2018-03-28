import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, Select, } from 'antd';
import '../../node_modules/antd/dist/antd.min.css';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../action/action.js';
import {Provider,connect} from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;


class NormalLoginForm extends Component {

  constructor(props){
        super(props);
        this.state = {
            result: '',
        }
    }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.identity === 'admin'){
          fetch('/adminLogin', {
          method: 'POST',
        headers: {
          'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: values.userName,
            password: values.password,
        })
      })
      .then(res => res.json())
      .then(data => {
        var timestamp=new Date().getTime();
        this.props.loginHandler(data.loginIdendity,data.loginId,data.loginName,timestamp);
        this.setState({result:data.loginState});
        if(data.loginState !== 'adminSuccess'){
          alert(data.loginState);
        }
      })

        }else if(values.identity === 'worker'){
          fetch('/workerLogin', {
          method: 'POST',
        headers: {
          'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: values.userName,
            password: values.password,
            identity: values.identity
        })
      })
      .then(res => res.json())
      .then(data => {
        var timestamp=new Date().getTime();
        this.props.loginHandler(data.loginIdendity,data.loginId,data.loginName,timestamp);
        this.setState({result:data.loginState});
        if(data.loginState !== 'workerSuccess'){
          alert(data.loginState);
        }

      });
        }else if(values.identity === 'customer'){
          fetch('/customerLogin', {
          method: 'POST',
        headers: {
          'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: values.userName,
            password: values.password,
            identity: values.identity
        })
      })
      .then(res => res.json())
      .then(data => {
        var timestamp=new Date().getTime();
        this.props.loginHandler(data.loginIdendity,data.loginId,data.loginName,timestamp);
        this.setState({result:data.loginState});
        if(data.loginState !== 'customerSuccess'){
          alert(data.loginState);
        }


      });
        };

    }
    });
  }
  render() {
  	if (this.state.result === 'workerSuccess') {  
    	return (<Redirect push to="/worker" />); 
  	} 
  	else if (this.state.result === 'adminSuccess') {  
    	return (<Redirect push to="/admin" />); 
  	}else if(this.state.result === 'customerSuccess'){
  		return (<Redirect push to="/customer" />)
  	}
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{backgroundImage:'url(background.jpg)',backgroundRepeat : 'no-repeat',width:'1530px',height:'650px'}}>  
        <div style={{width : '550px',height : '300px',float:'right',margin : '200px 200px 100px 100px','backgroundColor' : '#CCCCCC',}}>
          <div style = {{'fontSize' : '30px','letter-spacing': '0.5rem' ,margin : '0 auto'}}>
            中小型企业项目管理系统
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{margin : '20px 20px 20px 300px'}}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
            	{getFieldDecorator('identity',{
            		initialValue : 'admin'
            	})(
    	        	<Select
    		         style={{ width: '150px' }}
    		        >
    			         <Option value="admin">admin</Option>
    			         <Option value="customer">customer</Option>
    			         <Option value="worker">worker</Option>
    		        </Select>
            		)}	        
            </FormItem>
            <FormItem style={{'text-align':'right'}}>
              <Button type="primary" htmlType="submit" className="login-form-button" >
                Log in
              </Button>
            </FormItem>

          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);



const mapDispatchToProps = (dispatch) => {
  return {
    loginHandler: (loginIdendity,loginId,loginName,timestamp) => {
      dispatch(login(loginIdendity,loginId,loginName,timestamp));
    }
  }
}
const LoginConnected = connect(null,mapDispatchToProps)(WrappedNormalLoginForm);

export default LoginConnected;

