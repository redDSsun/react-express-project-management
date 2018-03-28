// import { List, Avatar, Button, Spin, Pagination } from 'antd';
// import React, { Component } from 'react';
// import reqwest from 'reqwest';
// import ProjectFilter from './ProjectFilter.js'
// import {loadProject} from './../../action/action.js';
// import {Provider,connect} from 'react-redux';


// const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

// class CustomerMainList extends Component {
//   state = {
//     loading: true,
//     loadingMore: false,
//     showLoadingMore: true,
//     data: [],
//   }

//   getProject = (project,filter) =>{
//     switch(filter.customerProjectFilter){
//       case 'all':
//         return project;
//       case 'new':
//         return project.map(item => {
//           if(item.projectState === 'new'){
//             return item;
//           }
//         })
//       case 'refused':
//          return project.map(item => {
//           if(item.projectState === 'refused'){
//             return item;
//           }
//         })
//       case 'in_progress':
//         return project.map(item => {
//           if(item.projectState === 'in_progress'){
//             return item;
//           }
//         })
//       case 'finished':
//         return project.map(item => {
//           if(item.projectState === 'finished'){
//             return item;
//           }
//         })
//       default :
//         return project;
//     }
//   }
//   componentWillMount(){
//     const loginId = this.props.state.loginInfo.loginId;
//       console.log(loginId);
//       fetch('http://localhost:5000/customer/getproject', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(
//           {loginId : loginId}
//           )
//       })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         this.props.loadProjectHandler(data);
//       })
//   }

//   componentDidMount() {    

//     this.getData((res) => {
//       this.setState({
//         loading: false,
//         data: currentProject,
//       });
//     });
//   }
//   getData = (callback) => {
//     reqwest({
//       url: fakeDataUrl,
//       type: 'json',
//       method: 'get',
//       contentType: 'application/json',
//       success: (res) => {
//         callback(res);
//       },
//     });
//   }
//   onLoadMore = () => {
//     this.setState({
//       loadingMore: true,
//     });
//     this.getData((res) => {
//       const data = this.state.data.concat(res.results);
//       this.setState({
//         data,
//         loadingMore: false,
//       }, () => {
//         window.dispatchEvent(new Event('resize'));
//       });
//     });
//   }
//   onChange = (page) => {
//       console.log(page);
//     }
//   render() {
//     const currentProject = this.getProject(this.props.state.project,this.props.state.customerProjectFilter);
//     const { loading, loadingMore, showLoadingMore, data } = this.state;
//     const loadMore = showLoadingMore ? (
//       <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
//         {loadingMore && <Spin />}
//         {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
//       </div>
//     ) : null;
//     return (
//       <div>
//         <ProjectFilter />
//         <List
//           className="demo-loadmore-list"
//           loading={loading}
//           itemLayout="horizontal"
//           loadMore={loadMore}
//           dataSource={data}
//           renderItem={item => (
//             <List.Item actions={[<a>edit</a>, <a>delete</a>]}>
//               <List.Item.Meta
//                 avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                 title={<a href="https://ant.design">{item.name.last}</a>}
//                 description= 'hah'
//               />
//               <div>content</div>
//             </List.Item>
//           )}
//         />
//       </div>
//     );
//   }
// }


// const mapStateToProps = (state) => {
//   return {state : state};
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadProjectHandler: (data) => {
//       dispatch(loadProject(data));
//     }
//   }
// }
// const CustomerMainListConnected = connect(mapStateToProps,mapDispatchToProps)(CustomerMainList);

// export default CustomerMainListConnected;



		     //    <FormItem
		     //      {...formItemLayout}
		     //      label="security question"
		     //    >
		     //    	{getFieldDecorator('securityQuestion',{
		     //    		initialValue: 'Which fruit is your favorite',
		     //    		rules: [{ required: false, message: 'Please select your security question!' }],
		     //    	})(
					  //   <Select >
							// <Option value="Which fruit is your favorite">Which fruit is your favorite</Option>
							// <Option value="What is your mom name">What is your mom name</Option>
					  //   </Select>
		     //    	)}
		     //    </FormItem>
		     //   	<FormItem
		     //   	  {...formItemLayout}
		     //      label="security answer"
		     //   	>
		     //    	{getFieldDecorator('securityAnswer',{
		     //    		rules: [{ required: false, message: 'Please input your securityAnswer!' }],
		     //    	})(
		     //    		<Input style={{ width: '100%' }} />
		     //    	)}
		     //    </FormItem>