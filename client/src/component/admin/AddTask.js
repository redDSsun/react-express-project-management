import { Form, Input, Icon, Button, DatePicker, Col,Select} from 'antd';
import React, { Component } from 'react';
import '../../../node_modules/antd/dist/antd.min.css';
import {Provider,connect} from 'react-redux';
import {login,loadProject} from '../../action/action.js';
import {Link, Redirect} from 'react-router-dom';
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const InputGroup = Input.Group
const { Option} = Select

class AddTask extends Component {
   state = {
      s : '',
      worker : [],
      id : ''
   }
componentWillMount(){
  fetch('http://localhost:5000/admin/getworker', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
                },
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.results)
        this.setState({
          worker : data.results,
             })
          });
}
handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values.worker)
        const projectOwner = this.props.state.loginInfo.loginId;
          fetch('http://localhost:5000/admin/addtask', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  projectId : this.props.projectId,
                  taskName: values.taskName,
                  taskInfo: values.taskInfo,
                  taskDeadLine: values.taskDeadLine,
                  workerId: values.worker,
                  taskState : 'new'
                })
          })
          .then(res => res.json())
          .then(data => {
              this.setState({s : 'ok'});
              this.props.getOk(this.state.s);
          });
      }
    });
  }

  changeDeadLine = (d,dd) => {
    for (var i = 0 ; i < 10 ; i++){
      dd += d[i].value
    }
  }

  // selectWorker = (id) => {
  //   console.log(id);
  //   this.setState({id : id})
  // }
render(){
  var currentWorker = this.state.worker;
  console.log(currentWorker)

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

  const { getFieldDecorator } = this.props.form;
  const dateFormat = 'yyyy/MM/dd';
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
           {...formItemLayout}
              label={(
                <span>
                  task name&nbsp;

                </span>
              )}
        >
          {getFieldDecorator('taskName', {
            rules: [{ required: true, message: 'Please input your task name!' }],
          })(
            <Input  placeholder="tesk name" />
          )}
        </FormItem>
        <FormItem
           {...formItemLayout}
              label={(
                <span>
                  task information&nbsp;

                </span>
              )}
        >
          {getFieldDecorator('taskInfo', {
            rules: [{ required: true, message: 'Please input your project information!' }],
          })(
            <TextArea  placeholder="task information"/>
          )}
        </FormItem>
        <FormItem
           {...formItemLayout}
              label={(
                <span>
                  task deadline&nbsp;

                </span>
              )}
        >
          {getFieldDecorator('taskDeadLine', {
            rules: [{ required: true, message: 'select your deadline!' }],
          })(
            <DatePicker prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}format={dateFormat} placeholder="task deadline"/>
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
          {getFieldDecorator('worker', {
            rules: [{ required: true, message: 'Please select a worker!' }],
          })(
             <Select
                style={{ width: 200 }}
              >
                {currentWorker.map(worker => {
                    return(
                      <Option value={worker._id}>{worker.userName}</Option>
                      )
                })} 

              </Select>
          )}         
        </FormItem>
        <FormItem style={{float : 'right'}}>
          <Button type="primary" htmlType="submit">add</Button> 
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




