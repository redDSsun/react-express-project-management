import { List, Avatar, Button, Spin, Pagination,Modal,Table,Icon, Divider, Input } from 'antd';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import reqwest from 'reqwest';
import {Provider,connect} from 'react-redux';
import ProjectDetail from './ProjectDetail.js'
import RefuseProject from './RefuseProject.js'
import {loadProject} from '../../action/action' 
import ProjectFilter from '../customer/ProjectFilter.js'

const confirm = Modal.confirm
class CustomerMain extends Component{
  state = {
    data: [],
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    detailVisible : false,
    addVisible : false,
    customer : {},
    userName : ''
  }

  componentDidMount() {
    this.getData((res) => {
      var arr = []
      for ( var i = 0;i< res.results.length ;i++){
        arr.push(res.results[i]);
      }
      this.setState({
        data: arr,
      });
    });
  }


  getData = (callback) => {
    reqwest({
      url: 'http://localhost:5000/admin/getcustomer',
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(
        {id : 1
        }),
      success: (res) => {
        callback(res);
      },
    });
  } 
  

   start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
   onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  delete = (id) => {
 		confirm({
		    title: 'delete',
		    content: 'Are you sure delete this customer?',
		    okText: 'Yes',
		    okType: 'danger',
		    cancelText: 'No',
		    onOk : () => {
		      console.log('ok')
		      fetch('http://localhost:5000/admin/deletecustomer', {
		                  method: 'POST',
		                  headers: {
		                    'Accept': 'application/json',
		                    'Content-Type': 'application/json'
		                  },
		                  body: JSON.stringify({
		                    _id: id,
		                  })
		            })
		            .then(res => res.json())
		            .then(data => {
		                    this.getData((res) => {
		                    var arr = []
		                    for ( var i = 0;i< res.results.length ;i++){
		                      arr.push(res.results[i]);
		                    }
		                    this.setState({
		                      data: arr,
		                    });
		                  })
		            });    
		    },
		    onCancel() {
		      console.log('Cancel');
		    },
		 })
  }

  addcustomer = () => {
  				console.log(this.state.userName)
  			      fetch('http://localhost:5000/admin/addcustomer', {
		                  method: 'POST',
		                  headers: {
		                    'Accept': 'application/json',
		                    'Content-Type': 'application/json'
		                  },
		                  body: JSON.stringify({
		                  	userName : this.state.userName
		                  })
		            })
		            .then(res => res.json())
		            .then(data => {
		            		alert(data.message);
		                    this.getData((res) => {
		                    var arr = []
		                    for ( var i = 0;i< res.results.length ;i++){
		                      arr.push(res.results[i]);
		                    }
		                    this.setState({
		                      data: arr,
		                    });
		                  })
		            	  this.setState({userName : ''});

		            }); 
  }

  onChange = (e) => {
  	this.setState({userName : e.target.value})
  }




  render(){

    const columns = [{
		  title: 'Name',
		  dataIndex: 'userName',
		  key: 'userName',
		  render: text => <a href="#">{text}</a>,
		}, {
		  title: 'nickName',
		  dataIndex: 'nickName',
		  key: 'nickName',
		}, {
		  title: 'email',
		  dataIndex: 'email',
		  key: 'email',
		},{
		  title: 'Phone',
		  dataIndex: 'phone',
		  key: 'phone',
		},  {
		  title: 'Address',
		  dataIndex: 'address',
		  key: 'address',
		}, {
		  title: 'Password',
		  dataIndex: 'password',
		  key: 'password',
		}, {
		  title: 'Action',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      <Button  onClick = {this.delete.bind(this,record._id)}>
		        delete 
		      </Button>
		    </span>
		  ),
		}];

	const { loading, selectedRowKeys } = this.state;



    return(
       <div>
       	<div style = {{'text-align' : 'right'}}>
       		<Input value = {this.state.userName}style = {{width : '200px',margin : '10px'}}placeholder="customer name" onChange = {this.onChange}>
			</Input>
       		<Button 
		      		type="primary" 
		      		shape="circle" 
		      		style = {{
			      		float:'right',
		                margin: '10px'
	            	}}
	            	onClick = {this.addcustomer.bind(this)}
	            ><Icon type='plus'/></Button>
	    </div>
        <Table 
        	rowKey = {(record) => {
        		return(record._id)
        	}}
        	columns={columns} dataSource={this.state.data} />

      </div>
      );
  }
}


const mapStateToProps = (state) => {
  return {state : state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    assignHandler: (data) => {
      dispatch(loadProject(data));
    }
  }
}
const CustomerMainConnected = connect(mapStateToProps,mapDispatchToProps)(CustomerMain);

export default CustomerMainConnected;