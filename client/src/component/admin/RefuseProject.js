import { Form, Input, Icon, Button, DatePicker, Col} from 'antd';
import React, { Component } from 'react';
import '../../../node_modules/antd/dist/antd.min.css';
import {Provider,connect} from 'react-redux';
import {login,loadProject} from '../../action/action.js';
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const InputGroup = Input.Group

class RefuseProject extends Component {
  state = {
    s : ''
  }
handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.props.item._id,values.reason)
        var timestamp =(new Date()).valueOf();
        // console.log(this.props.state)
        // console.log(this.props.state.loginInfo.loginId);
        // console.log(values.projectInfo);
        // const projectOwner = this.props.state.loginInfo.loginId;
          fetch('http://localhost:5000/admin/refuseproject', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  _id : this.props.item._id,
                  projectLastChangeTime: timestamp,
                  projectLastChangeDesc: values.reason,
                  projectState : 'refused',
                })
          })
          .then(res => res.json())
          .then(data => {
            this.setState({s : 'ok'},function(){
              this.props.getRefuseState(this.state.s);
            });

          });

      }
    });

  }


render(){
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

  const projectDeadline = this.props.item.projectDeadline;
  const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
          {...formItemLayout}
          label="reason"
        >
          {getFieldDecorator('reason', {
            rules: [{ required: true, message: 'Why do you refuse this project' }],
          })(
            <Input   />
          )}
        </FormItem>
        <FormItem style={{float : 'right'}}>
          <Button type="primary" htmlType="submit">ok</Button> 
        </FormItem>
      </Form>
    )
}
}

const WrappedRefuseProject = Form.create()(RefuseProject);



const mapStateToProps = (state) => {
  return {state : state};
}

const RefuseProjectConnected = connect(mapStateToProps,null)(WrappedRefuseProject);


export default RefuseProjectConnected;




