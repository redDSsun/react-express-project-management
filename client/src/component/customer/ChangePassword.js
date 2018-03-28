import React, { Component } from 'react';
import {Provider,connect} from 'react-redux';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class ChangePassword extends Component{
	state ={
		confirmDirty: false,
		passwordIsTure: false,
		data : {},
	}

	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log(this.props.state.loginInfo.loginId)
	        console.log(values.oldpassword)
	        console.log(values.confirm)
	          fetch('http://localhost:5000/customer/changepassword', {
	                method: 'POST',
	                headers: {
	                  'Accept': 'application/json',
	                  'Content-Type': 'application/json'
	                },
	                body: JSON.stringify({
	                  _id: this.props.state.loginInfo.loginId,
	                  oldPassword: values.oldpassword,
	                  newPassword: values.confirm
	                })
	          })
	          .then(res => res.json())
	          .then(data => {
	          	if(data.message === 'password update success'){
	          		alert(data.message);
	          		this.props.form.resetFields();
	          	}else{
	          		alert(data.message);
	          		this.props.form.resetFields();
	          	}	          	
	          });
	      }
	    });
  	}
	     compareToFirstPassword = (rule, value, callback) => {
		    const form = this.props.form;
		    if (value && value !== form.getFieldValue('password')) {
		      callback('Two passwords that you enter is inconsistent!');
		    } else {
		      callback();
		    }
		  }
		 validateToNextPassword = (rule, value, callback) => {
		    const form = this.props.form;
		    if (value && this.state.confirmDirty) {
		      form.validateFields(['confirm'], { force: true });
		    }
		    callback();
		  }  	

	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 8,
	        },
	      },
	    };

		
		return(
			<Form onSubmit={this.handleSubmit}
				        style={{
			          width:'700px',
			          margin:'0 auto'
			        }}
			>
		        <FormItem
		          {...formItemLayout}
		          label="Password"
		        >
		          {getFieldDecorator('oldpassword', {
		            rules: [{
		              required: true, message: 'Please input your old password!',
		            }],
		          })(
		            <Input type="password" />
		          )}
		        </FormItem>
		        <FormItem
		          {...formItemLayout}
		          label="Password"
		        >
		          {getFieldDecorator('password', {
		            rules: [{
		              required: true, message: 'Please input new password!',
		            }, {
		              validator: this.validateToNextPassword,
		            }],
		          })(
		            <Input type="password" />
		          )}
		        </FormItem>
		        <FormItem
		          {...formItemLayout}
		          label="Confirm Password"
		        >
		          {getFieldDecorator('confirm', {
		            rules: [{
		              required: true, message: 'Please confirm your new password!',
		            }, {
		              validator: this.compareToFirstPassword,
		            }],
		          })(
		            <Input type="password" onBlur={this.handleConfirmBlur} />
		          )}
		        </FormItem>
		        <FormItem 
		        	style={{
			            float:'right'
			          }}
		        >
		          <Button type="primary" htmlType="submit">Register</Button>
		        </FormItem>
		    </Form>

			);
	}
}

const WrappedChangePassword = Form.create()(ChangePassword);

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
const ChangePasswordConnected = connect(mapStateToProps,null)(WrappedChangePassword);

export default ChangePasswordConnected;
