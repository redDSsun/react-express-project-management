import React, { Component } from 'react';
import {Provider,connect} from 'react-redux';
import { Form, Input, Icon, Button,Card ,Row,Col,Modal,Tooltip} from 'antd';
import reqwest from 'reqwest';
import AddTask from './AddTask'
import DetaiTask from './DetailTask'
import {Link, Redirect} from 'react-router-dom';
const FormItem = Form.Item;
const confirm = Modal.confirm

class AssignTask extends Component {
	state = {
		_id : '',
		filter : 'all',
		data : [],
		addVisible : false,
		detailVisible : false,
		task : {},
		back : false,
		flag : true
	}
	componentWillMount(){
		var comeid = this.props.match.params.id;
		console.log(comeid)
		var id = '';
		for(var i =1;i<comeid.length;i++){
			id += comeid[i]
		}
		this.setState({_id : id},function(){
			this.getData((res) => {
				console.log(res.results);
		      var arr = []
		      for ( var i = 0;i< res.results.length ;i++){
		        arr.push(res.results[i]);
		      }
		      this.setState({
		        data: arr,
		      });
		      console.log(this.state.data)

		      if(res.results.length === 0){
		      	this.setState({flag : false})
		      }else{
		      	for(var i = 0;i< res.results.length;i++){
		      	if(res.results[i].taskState !== 'finished'){
		      		this.setState({flag : false});
		      		break;
		      	}
		      }
		      }

		    });
		});


	}

	getData = (callback) => {
	    reqwest({
	      url: 'http://localhost:5000/admin/gettask',
	      type: 'json',
	      method: 'post',
	      contentType: 'application/json',
	      data: JSON.stringify(
	        {
	          projectId : this.state._id
	        }),
	      success: (res) => {
	        callback(res);
	      },
	    });
 	}
 	showDetail = (task) => {
 		this.setState({
 			detailVisible : true,
 			task : task
 		})
 	} 
 	delete = (id) => {
 		confirm({
		    title: 'delete',
		    content: 'Are you sure delete this task?',
		    okText: 'Yes',
		    okType: 'danger',
		    cancelText: 'No',
		    onOk : () => {
		      console.log('ok')
		      fetch('http://localhost:5000/admin/deletetask', {
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

 	addtask = () =>{
 		this.setState({
 			addVisible : true
 		})
 	}

 	handleOk = () =>{
 		this.setState({
 			addVisible : false,
 			detailVisible : false
 		})
 	}
 	handleCancel = () =>{
 		this.setState({
 			addVisible : false,
 			detailVisible : false
 		})
 	}
 	getAddState = (state) =>{
 		state === 'ok'?this.setState({addVisible : false}) : null
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
 	getDetailState = (state) => {
 		state === 'ok'?this.setState({detailVisible : false}) : null
 	}

 	back = () => {
 		this.setState({back : true})
 	}

 	finish = () => {
		      fetch('http://localhost:5000/admin/finishproject', {
		                  method: 'POST',
		                  headers: {
		                    'Accept': 'application/json',
		                    'Content-Type': 'application/json'
		                  },
		                  body: JSON.stringify({
		                    _id: this.state._id
		                  })
		            })
		            .then(res => res.json())
		            .then(data => {
		            	alert(data.message);
		            });		
 	}
	render(){
		const currentTask = this.state.data;
		console.log(currentTask)

		var button = (this.state.flag === true ? 
			(<Button style={{margin: '10px'}} type = 'primary' onClick = {this.finish.bind(this)}>finish</Button>) : 
				<Button style={{margin: '10px'}} disabled>finish</Button>)
		if(this.state.back === true){
			return(
				<Redirect to = '/admin'/>
				)
		}
    return (
	    <div>
	    	<div style = {{height : '50px'}}>
		      <div style={{float : 'left',margin: '10px'}}>		      
		      	<Button type = 'primary' onClick = {this.back.bind(this)}><Icon type = 'rollback'/></Button>
		      </div>
		      	{button}
		      	<Button 
		      		type="primary" 
		      		shape="circle" 
		      		style = {{
			      		float:'right',
		                margin: '10px'
	            	}}
	            	onClick = {this.addtask.bind(this,this.state._id)}
	            ><Icon type='plus'/></Button>
	      	</div>
		  <div style={{ background: '#ECECEC', padding: '30px'}}>
		  	<Row gutter={16}>
			  	{currentTask.map(task => {
			  		console.log(task)
			  		console.log(task.workerId.userName)
			  		var taskInfo = task.taskInfo
			  		var l = (taskInfo.length > 30) ? 30 : taskInfo.length
			  		var info = '';
			  		for(var i = 0;i<l;i++){
			  			info += taskInfo[i]
			  		}
			  		var lessInfo = (taskInfo.length > 30) ? (info + '...') : info

			  		return(
				  		<Col span={8} style = {{padding : '30px '}} key = {task._id}>
					        <Card
					        	key = {task._id} 					        	
					        	title={task.taskName}
					        	bordered={false} 
					        	extra={[(task.taskState === 'new')?(<Icon type = 'file'/>) : (task.taskState === 'in progress'? <Icon type ='file' style ={{color : 'Orange'}}/> : <Icon type ='file' style ={{color : 'Green'}}/>)]} 
					        	hoverable = {true} 
					        	actions = {[
					        		<Button size = 'small' onClick = {this.showDetail.bind(this,task)}>detail</Button>,
					        		<Button size = 'small' onClick = {this.delete.bind(this,task._id)}>delete</Button>
					        	]}
					        >{lessInfo}</Card>
					    </Col>					     
			  			)
			  	})}
		    </Row>
		  </div>
		  <Modal
			  title = 'assign task'
	          visible = {this.state.addVisible}
	          onOk={this.handleOk}
	          onCancel={this.handleCancel}
	          footer = {[]}
		  >
		  	<AddTask 
		  		projectId = {this.state._id}
		  		getOk = {this.getAddState}
		  	/>
		  </Modal>
		  <Modal
		  	title = 'task detail'
	        visible = {this.state.detailVisible}
	        onOk={this.handleOk}
	        onCancel={this.handleCancel}
	        footer = {[]}
		  >
		  	<DetaiTask 
		  		task = {this.state.task}
		  		getOk = {this.getDetailState}
		  	/>
		  </Modal>
		</div>
    );
  }
}

const WrappedAssignTask = Form.create()(AssignTask);

const mapStateToProps = (state) => {
  return {state : state};
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     assignHandler: (data) => {
//       dispatch(loadProject(data));
//     }
//   }
// }
const AssignTaskConnected = connect(mapStateToProps,null)(WrappedAssignTask);
export default AssignTaskConnected;
