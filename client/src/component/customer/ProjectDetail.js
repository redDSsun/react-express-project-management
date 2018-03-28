import { Form, Input, Icon, Button, DatePicker, Col} from 'antd';
import React, { Component } from 'react';
import '../../../node_modules/antd/dist/antd.min.css';
import {Provider,connect} from 'react-redux';
import {login,loadProject} from '../../action/action.js';
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const InputGroup = Input.Group

class ProjectDetail extends Component {
  state = {
    s : ''
  }
handleSubmit = (e) => {
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     var timestamp =(new Date()).valueOf();
    //     console.log(this.props.state)
    //     console.log(this.props.state.loginInfo.loginId);
    //     console.log(values.projectInfo);
    //     const projectOwner = this.props.state.loginInfo.loginId;
    //       fetch('http://localhost:5000/customer/editproject', {
    //             method: 'POST',
    //             headers: {
    //               'Accept': 'application/json',
    //               'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //               _id : this.props.item._id,
    //               projectName: values.projectName,
    //               projectOwner: projectOwner,
    //               projectInfo: values.projectInfo,
    //               projectBudget: values.projectBudget,
    //               projectNewTime: timestamp,
    //               projectDeadline: values.projectDeadline,
    //               projectLastChangeTime: timestamp,
    //               projectLastChangeDesc: 'customer edit this project',
    //               projectState : 'new',
    //               projectChangeToAdmin: false,
    //               projectChangeToUser: false,
    //               projectChangeToCustomer: false
    //             })
    //       })
    //       .then(res => res.json())
    //       .then(data => {
    //           this.setState({EditState : 'EditSuccess'});
    //           this.props.getEditState(this.state.EditState)
    //       });
    //   }
    // });
    this.setState({s : 'ok'},function(){
      this.props.getProjectDetailState(this.state.s);
    })
    
  }


render(){
  console.log(this.props.item.projectDeadline);
  console.log('detail')
  const projectDeadline = this.props.item.projectDeadline;
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
      <Form onSubmit={this.handleSubmit} className="login-form">
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
          })(
            <Input disabled />
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
          })(
            <TextArea disabled/>
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
            initialValue: moment(projectDeadline),
          })(
            <DatePicker disabled/>
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
          })(
            <Input disabled/>
          )}         
        </FormItem>
        <FormItem
          {...formItemLayout}
              label={(
                <span>
                  project create time&nbsp;

                </span>
              )}
        >
          {getFieldDecorator('projectBudget', {
            initialValue: this.props.item.projectNewTime,
          })(
            <Input disabled/>
          )}         
        </FormItem>
                <FormItem
          {...formItemLayout}
              label={(
                <span>
                  project state&nbsp;

                </span>
              )}
        >
          {getFieldDecorator('projectBudget', {
            initialValue: this.props.item.projectState,
          })(
            <Input disabled/>
          )}         
        </FormItem>
        <FormItem style = {{float : 'right'}}>
          <Button type="primary" htmlType="submit">ok</Button> 
        </FormItem>
      </Form>
    )
}
}

const WrappedProjectDetail = Form.create()(ProjectDetail);



const mapStateToProps = (state) => {
  return {state : state};
}

const ProjectDetailConnected = connect(mapStateToProps,null)(WrappedProjectDetail);


export default ProjectDetailConnected;




