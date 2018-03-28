import { List, Avatar, Button, Spin, Pagination,Modal,Icon } from 'antd';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import reqwest from 'reqwest';
import {Provider,connect} from 'react-redux';
import ProjectDetail from './ProjectDetail.js'
import RefuseProject from './RefuseProject.js'
import {loadProject} from '../../action/action' 
import ProjectFilter from '../customer/ProjectFilter.js'

class AdminMainList extends Component{
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
    num : 1,
    filter : 'all',
    visible : false,
    detailVisible : false,
    refuseVisible : false,
    item : {},
    assign : false
  }

  componentDidMount() {
    this.getData((res) => {
      var l = ((5 * this.state.num) < (res.results.length))? 5 * this.state.num : res.results.length
      var arr = []
      for ( var i = (5 * this.state.num - 5);i< l ;i++){
        arr.push(res.results[i]);
      }
      this.setState({
        loading: false,
        data: arr,
        num : this.state.num + 1,
      });
    });
  }


  getData = (callback) => {
    reqwest({
      url: 'http://localhost:5000/admin/getproject',
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(
        {
          state : this.state.filter
        }),
      success: (res) => {
        callback(res);
      },
    });
  } 
  
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
    this.getData((res) => {
      if((5 * this.state.num - 5 )>= res.results.length){
        this.setState({
          data : this.state.data,
          loadMore: false,
        })
        alert('no more data');
      }
      var l = ((5 * this.state.num) < (res.results.length))? 5 * this.state.num : res.results.length
      var arr = []
      for ( var i = (5 * this.state.num - 5);i< l;i++){
        arr.push(res.results[i]);
      }
      const data = this.state.data.concat(arr);
      this.setState({
        data,
        loadingMore: false,
        num : this.state.num + 1
      }, () => {
        window.dispatchEvent(new Event('resize'));
      });
    });
  }

  showDetail = (item) => {
      this.setState({
      detailVisible: true,
      item : item
    });
  }

  getProjectDetailState = (state) =>{
    if(state === 'ok'){
          this.setState({detailVisible : false});
    }

  }
  getRefuseState = (state) => {
    if(state === 'ok'){
      this.setState({refuseVisible : false})
      this.getData((res) => {
        console.log(res)
        var l = ((5 * this.state.num) < (res.results.length))? 5 * this.state.num : res.results.length
        var arr = []
        for ( var i = 0;i< l ;i++){
          arr.push(res.results[i]);
        }
        this.setState({
          loading: false,
          data: arr,
          num : this.state.num + 1,
        });
      });
    }
  }

  showRefused =(item) => {
    console.log(item._id)
    this.setState({
      refuseVisible: true,
      item : item
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      detailVisible : false,
      refuseVisible : false
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      detailVisible : false,
      refuseVisible : false
    });
  }

  assign = (item) => {
    this.props.assignHandler(item);
    this.setState({
      assign : true,
      item : item
    })
  }

getFilter = (value) => {
    this.setState({filter : value}, function() {
      this.setState({num : 1})
      this.getData((res) => {
      var l = ((5 * this.state.num) < (res.results.length))? 5 * this.state.num : res.results.length
      var arr = []
      for ( var i = (5 * this.state.num - 5);i< l ;i++){
        arr.push(res.results[i]);
      }
      this.setState({
        loading: false,
        data: arr,
        num : this.state.num + 1,
      });
    });
    });
  }


  render(){
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;

    if(this.state.assign === true){
      console.log(this.state.item._id)
      // return (<Redirect push to='admin/assignTask'/>); 
      var url = 'admin/assignTask/:' + this.state.item._id
      return (<Redirect to={{pathname : url}}/>); 
    }
    return(
      <div>
        <div style={{margin : '10px'}}>
          <ProjectFilter getFilter = {this.getFilter} />
        </div>
        <div>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={item => (
              <List.Item actions={[
                                    (item.projectState === 'new') ? (<Button type="primary" onClick = {this.showRefused.bind(this,item)}>refuse</Button>): (<Button disabled>refuse</Button>),
                                    ((item.projectState === 'new') || (item.projectState === 'in progress')) ? (<Button type="primary" onClick = {this.assign.bind(this,item)}>assign</Button>): (<Button disabled>assign</Button>),
                                          // <Button onClick = {this.assign.bind(this,item)}>assign</Button>),
                                    // (item.projectState === 'new'|| item.projectState === 'refused') ?(<Button onClick = { this.showModal.bind(this, item)}>edit</Button>) : (<Button disabled>edit</Button>), 
                                    // (item.projectState === 'new'|| item.projectState === 'refused') ?(<Button onClick = {this.showDeleteConfirm.bind(this,item._id)}>delete</Button>) : (<Button disabled>delete</Button>),
                                    // <Button onClick = {this.showDetail.bind(this,item)}>detail</Button>
                                    <Button type="primary" onClick = {this.showDetail.bind(this,item)}>detail</Button>
                                    ]}>
                 <List.Item.Meta 
                  title={<div><p>{item.projectName}</p><p>{item.projectOwner.userName}</p></div>}
                  description={item.projectState}
                />
                <div style ={{
                    width : '355px'
                }}>
                    <span>{item.projectLastChangeTime}</span><br/>
                    <span>{item.projectLastChangeDesc}</span>
                </div>
              </List.Item>
            )}
          />
        </div>

        <Modal
          title="Project Details"
          visible={this.state.detailVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer = {[]}
        >
          <ProjectDetail
            item = {this.state.item}
            getProjectDetailState = {this.getProjectDetailState}
          />
        </Modal>

        <Modal
          title = 'refuse project'
          visible = {this.state.refuseVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer = {[]}
        >
          <RefuseProject 
            item = {this.state.item}
            getRefuseState = {this.getRefuseState}
          />
        </Modal>
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
const AdminMainListConnected = connect(mapStateToProps,mapDispatchToProps)(AdminMainList);

export default AdminMainListConnected;