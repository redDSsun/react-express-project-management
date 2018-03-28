import React, { Component } from 'react';
import {Provider,connect} from 'react-redux';
import reqwest from 'reqwest';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class EditWorker extends Component{
	state ={
		data : {},
	}

		handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	          fetch('http://localhost:5000/worker/updateworker', {
	                method: 'POST',
	                headers: {
	                  'Accept': 'application/json',
	                  'Content-Type': 'application/json'
	                },
	                body: JSON.stringify({
	                  _id: this.props.state.loginInfo.loginId,
	                  nickName: values.nickName,
	                  email: values.email,
	                  phone: values.phone,
	                  address: values.address
	                })
	          })
	          .then(res => res.json())
	          .then(data => {	          
	          		alert(data.message);
	          		this.props.form.resetFields();	          	          	
	          });
	      }
	    });
  	}

	componentWillMount() {
	    this.getData((res) => {
	      console.log(res.data)
	      this.setState({
	        data: res.data,
	      });
	      console.log(this.state.data)
	    });
	  }
  	getData = (callback) => {
  		console.log(this.props.state.loginInfo.loginId)
	    reqwest({
	      url: 'http://localhost:5000/worker/getworker',
	      type: 'json',
	      method: 'post',
	      contentType: 'application/json',
	      data: JSON.stringify(
	        {
	          _id : this.props.state.loginInfo.loginId,
	        }),
	      success: (res) => {
	        callback(res);
	      },
	    });
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
			<div style= {{width : '700px',margin:'0 auto'}}>
			<Form onSubmit={this.handleSubmit}>
			    <FormItem
		          {...formItemLayout}
		          label={(
		            <span>
		              Nickname&nbsp;
		              <Tooltip title="What do you want others to call you?">
		                <Icon type="question-circle-o" />
		              </Tooltip>
		            </span>
		          )}
		        >
		          {getFieldDecorator('nickName', {
		          	initialValue: this.state.data.nickName,
		            rules: [{ required: false, message: 'Please input your nickname!', whitespace: true }],
		          })(
		            <Input />
		          )}
		        </FormItem>
				<FormItem
		          {...formItemLayout}
		          label="E-mail"
		        >
		          {getFieldDecorator('email', {
		          	initialValue: this.state.data.email,
		            rules: [{
		              type: 'email', message: 'The input is not valid E-mail!',
		            }],
		          })(
		            <Input />
		          )}
		        </FormItem>
		        <FormItem
		          {...formItemLayout}
		          label="Phone Number"
		        >
		          {getFieldDecorator('phone', {
		          	initialValue: this.state.data.phone,
		            rules: [{ required: false, message: 'Please input your phone number!' }],
		          })(
		            <Input style={{ width: '100%' }} />
		          )}
		        </FormItem>
		        <FormItem
		          {...formItemLayout}
		          label="address"
		        >
		          {getFieldDecorator('address', {
		          	initialValue: this.state.data.address,
		            rules: [{ required: false, message: 'Please input your  address!' }],
		          })(
		            <Input style={{ width: '100%' }} />
		          )}
		        </FormItem>
		       	<FormItem style = {{float : 'right'}}> 
		         	<Button type="primary" htmlType="submit">edit</Button> 
		        </FormItem>



        	</Form>
        	</div>
			);
	}
}

const WrappedEditWorker = Form.create()(EditWorker);
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
const EditWorkerConnected = connect(mapStateToProps,null)(WrappedEditWorker);

export default EditWorkerConnected;
