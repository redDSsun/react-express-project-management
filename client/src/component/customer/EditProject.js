import { Form, Input, Icon, Button, DatePicker, Col} from 'antd';
import React, { Component } from 'react';
import '../../../node_modules/antd/dist/antd.min.css';
import {Provider,connect} from 'react-redux';
import {login,loadProject} from '../../action/action.js';
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const InputGroup = Input.Group

class EditProject extends Component {
   state = {
      EditState : ''
   }
handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var timestamp =(new Date()).valueOf();
        console.log(this.props.state)
        console.log(this.props.state.loginInfo.loginId);
        console.log(values.projectInfo);
        const projectOwner = this.props.state.loginInfo.loginId;
          fetch('http://localhost:5000/customer/editproject', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  _id : this.props.item._id,
                  projectName: values.projectName,
                  projectOwner: projectOwner,
                  projectInfo: values.projectInfo,
                  projectBudget: values.projectBudget,
                  projectNewTime: timestamp,
                  projectDeadline: values.projectDeadline,
                  projectLastChangeTime: timestamp,
                  projectLastChangeDesc: 'customer edit this project',
                  projectState : 'new',
                  projectChangeToAdmin: false,
                  projectChangeToUser: false,
                  projectChangeToCustomer: false
                })
          })
          .then(res => res.json())
          .then(data => {
              this.setState({EditState : 'EditSuccess'});
              this.props.getEditState(this.state.EditState)
          });
      }
    });
  }

  changeDeadLine = (d,dd) => {
    for (var i = 0 ; i < 10 ; i++){
      dd += d[i].value
    }
  }

render(){
  console.log(this.props.item.projectDeadline);
  const projectDeadline = this.props.item.projectDeadline;
  console.log(typeof(projectDeadline))
  var deadLine = '';
  for (var i = 0 ; i< 10 ; i++){
    deadLine += projectDeadline[i]
  }
  console.log(deadLine)
  console.log(typeof(moment(deadLine,'YYYYMMDD')))
  console.log(typeof(deadLine))
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
            initialValue: this.props.item.projectName,
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
            initialValue: this.props.item.projectInfo,
            rules: [{ required: true, message: 'Please input your project information!' }],
          })(
            <TextArea rows={4} placeholder="project information"/>
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
            initialValue: moment(this.props.item.projectDeadline),
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
            initialValue: this.props.item.projectBudget,
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
          <Button type="primary" htmlType="submit">Ok</Button>
        </FormItem>
      </Form>
    )
}
}

const WrappedEditProject = Form.create()(EditProject);



const mapStateToProps = (state) => {
  return {state : state};
}

const EditProjectConnected = connect(mapStateToProps,null)(WrappedEditProject);


export default EditProjectConnected;




