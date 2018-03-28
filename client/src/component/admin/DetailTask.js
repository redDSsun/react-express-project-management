import { Form, Input, Icon, Button, DatePicker, Col,Select,Tooltip} from 'antd';
import React, { Component } from 'react';
import '../../../node_modules/antd/dist/antd.min.css';
import {Provider,connect} from 'react-redux';
import {login,loadProject} from '../../action/action.js';
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const InputGroup = Input.Group
const { Option} = Select

class AddTask extends Component {
   state = {
      s : '',
   }
handleSubmit = (e) => {   
    this.setState({s : 'ok'},function(){
          this.props.getOk(this.state.s);
    });

  }

  changeDeadLine = (d,dd) => {
    for (var i = 0 ; i < 10 ; i++){
      dd += d[i].value
    }
  }
render(){
  console.log(this.props.task)
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
  const dateFormat = 'yyyy/MM/dd';
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Name&nbsp;
                </span>
              )}
            >
              {getFieldDecorator('nickname', {
                initialValue: this.props.task.taskName
              })(
                <Input disabled/>
              )}
        </FormItem>
        <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Information&nbsp;
                </span>
              )}
            >
              {getFieldDecorator('nickname', {
                initialValue: this.props.task.taskInfo,
              })(
                <TextArea disabled/>
              )}
        </FormItem>
        <FormItem
              {...formItemLayout}
              label={(
                <span>
                  DeadLine&nbsp;
                </span>
              )}
            >
              {getFieldDecorator('nickname', {
                initialValue: this.props.task.taskDeadLine,
              })(
                <Input disabled/>
              )}
        </FormItem>
        <FormItem
              {...formItemLayout}
              label={(
                <span>
                  worker&nbsp;
                </span>
              )}
            >
              {getFieldDecorator('nickname', {
                initialValue: this.props.task.workerId.userName,
              })(
                <Input disabled/>
              )}
        </FormItem>
        <FormItem
              {...formItemLayout}
              label={(
                <span>
                  state&nbsp;
                </span>
              )}
            >
              {getFieldDecorator('nickname', {
                initialValue: this.props.task.taskState,
              })(
                <Input disabled/>
              )}
        </FormItem>
        <FormItem style={{float : 'right'}}>
          <Button type="primary" htmlType="submit">ok</Button> 
        </FormItem>
      </Form>
    )
}
}

const WrappedAddTask = Form.create()(AddTask);



const mapStateToProps = (state) => {
  return {state : state};
}

const AddTaskConnected = connect(mapStateToProps,null)(WrappedAddTask);


export default AddTaskConnected;




