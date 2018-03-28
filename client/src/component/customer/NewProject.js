import { Form, Input, Icon, Button, DatePicker, Col} from 'antd';
import React, { Component } from 'react';
import '../../../node_modules/antd/dist/antd.min.css';
import {Provider,connect} from 'react-redux';
import {login,loadProject} from '../../action/action.js';
const FormItem = Form.Item;
const { TextArea } = Input;
const InputGroup = Input.Group

class NewProject extends Component {

handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var timestamp =(new Date()).valueOf();
        console.log(this.props.state)
        console.log(this.props.state.loginInfo.loginId);
        console.log(values.projectDeadline);
        const projectOwner = this.props.state.loginInfo.loginId;
          fetch('http://localhost:5000/customer/addproject', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  projectName: values.projectName,
                  projectOwner: projectOwner,
                  projectInfo: values.projectInfo,
                  projectBudget: values.projectBudget,
                  projectNewTime: timestamp,
                  projectDeadline: values.projectDeadline,
                  projectLastChangeTime: timestamp,
                  projectLastChangeDesc: 'new a project',
                  projectState : 'new',
                  projectChangeToAdmin: false,
                  projectChangeToUser: false,
                  projectChangeToCustomer: false
                })
          })
          .then(res => res.json())
          .then(data => {
            alert(data.message)
            this.props.form.resetFields();
          });
      }
    });
  }
render(){
  console.log(this.props.state.loginInfo)
  const { getFieldDecorator } = this.props.form;
  const dateFormat = 'YYYY/MM/DD';

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
    return (
      <Form onSubmit={this.handleSubmit} className="login-form"
        style={{
          width:'700px',
          margin:'0 auto'
        }}
      >
        <FormItem
           {...formItemLayout}
              label={(
                <span>
                  project name&nbsp;

                </span>
              )}
        >
          {getFieldDecorator('projectName', {
            rules: [{ required: true, message: 'Please input your project name!' }],
          })(
            <Input  placeholder="project name" />
          )}
        </FormItem>
        <FormItem
           {...formItemLayout}
              label={(
                <span>
                  project information&nbsp;

                </span>
              )}
        >
          {getFieldDecorator('projectInfo', {
            rules: [{ required: true, message: 'Please input your project information!' }],
          })(
            <TextArea prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}rows={4} placeholder="project information"/>
          )}
        </FormItem>
        <FormItem

           {...formItemLayout}
              label={(
                <span>
                  project deadline&nbsp;

                </span>
              )}
        >
          {getFieldDecorator('projectDeadline', {
            rules: [{ required: true, message: 'select your deadline!' }],
          })(
            <DatePicker prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}format={dateFormat} placeholder="project deadline"/>
          )}
         </FormItem>        
        <FormItem 


           {...formItemLayout}
              label={(
                <span>
                  project budget&nbsp;

                </span>
              )}
        >
          {getFieldDecorator('projectBudget', {
            rules: [{ required: true, message: 'Please input your budget!' }],
          })(
            <Input addonAfter="RMB" placeholder="project budget"/>
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
    )
}
}

const WrappedNewProject = Form.create()(NewProject);



const mapStateToProps = (state) => {
  return {state : state};
}

const NewProjectConnected = connect(mapStateToProps,null)(WrappedNewProject);


export default NewProjectConnected;




