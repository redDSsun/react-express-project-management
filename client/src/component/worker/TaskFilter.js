import { Select } from 'antd';
import React, { Component } from 'react';
import {setCustomerProjectFilter} from '../../action/action.js';
import {connect} from 'react-redux';
const Option = Select.Option;

class TaskFilter extends Component{

  handleChange = (value) => {
    console.log(value);
    this.props.getFilter(value);
  }

  render(){
    return(
        <div>
          <Select defaultValue="all" style={{ width: 150 }} onChange={this.handleChange}>
            <Option value="all">all</Option>
            <Option value='new'>new</Option>
            <Option value="in progress">in progess</Option>
            <Option value="finished">finished</Option>
          </Select>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {state : state};
}
const mapDispatchToProps = (dispatch) => {
  return {
    customerProjectFilterHandler: (data) => {
      dispatch(setCustomerProjectFilter(data));
    }
  }
}
const TaskFilterConnected = connect(mapStateToProps,mapDispatchToProps)(TaskFilter);

export default TaskFilterConnected;
