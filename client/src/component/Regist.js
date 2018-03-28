import { Form, Input, Icon, Button } from 'antd';
import React, { Component } from 'react';
import '../../node_modules/antd/dist/antd.min.css';
const FormItem = Form.Item;

class RegistrationForm extends Component {

handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values.userName)
          fetch('http://localhost:5000/workerRegist', {
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
          .then(data => alert(data.message));
      }
    });
  }
render(){
  const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    )
}
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;