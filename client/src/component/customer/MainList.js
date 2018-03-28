import { List, Avatar, Button, Spin, Pagination,Modal } from 'antd';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import ProjectFilter from './ProjectFilter.js'
import EditProject from './EditProject.js'
import ProjectDetail from './ProjectDetail.js'
import {loadProject} from './../../action/action.js';
import {Provider,connect} from 'react-redux';

const confirm = Modal.confirm;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class CustomerMainList extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
    num : 1,
    filter : 'all',
    visible : false,
    detailVisible : false,
    item : {}
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
      url: 'http://localhost:5000/customer/getproject',
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(
        {
          loginId : this.props.state.loginInfo.loginId,
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

  getFilter = (value) => {
    console.log('value',value)
    this.setState({filter : value}, function() {
      console.log('getFilter callback');
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

  handleEdit = (id) => {
    console.log('onEdit', id);
    alert(id)
  }



  showDeleteConfirm = (e) => {
  confirm({
    title: 'delete',
    content: 'Are you sure delete this project?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk : () => {
      console.log('ok')
      fetch('http://localhost:5000/customer/deleteproject', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id: e,
                  })
            })
            .then(res => res.json())
            .then(data => {
                    this.getData((res) => {
                    console.log('getdata')
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
                  })
            });    
    },
    onCancel() {
      console.log('Cancel');
    },
  })
}
  
  showModal = (item) => {
    this.setState({
      visible: true,
      item : item
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      detailVisible : false
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      detailVisible : false
    });
  }

  getEditState = (state) =>{
    if(state === 'EditSuccess'){
      this.setState({visible : false});
                          this.getData((res) => {
                    console.log('getdata')
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
                  })

    }
    // (state === 'EditSuccess')? (this.setState({visible : false}) : null)
  }

  getProjectDetailState = (state) =>{
    if(state === 'ok'){
          this.setState({detailVisible : false});
    }

  }

  showDetail = (item) => {
      this.setState({
      detailVisible: true,
      item : item
    });
  }

  render() {
    // const currentProject = this.getProject(this.props.state.project,this.props.state.customerProjectFilter);
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    console.log(this.state.data)

    return (
      <div >
        <div style= {{margin : '10px'}}>
        <ProjectFilter getFilter = {this.getFilter}/>
        </div>
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={data}
          renderItem={item => (
            <List.Item actions={[
                                  (item.projectState === 'new'|| item.projectState === 'refused') ?(<Button type="primary" onClick = { this.showModal.bind(this, item)}>edit</Button>) : (<Button type="primary" disabled>edit</Button>), 
                                  (item.projectState === 'new'|| item.projectState === 'refused') ?(<Button type="primary" onClick = {this.showDeleteConfirm.bind(this,item._id)}>delete</Button>) : (<Button type="primary" disabled>delete</Button>),
                                  <Button type="primary" onClick = {this.showDetail.bind(this,item)}>detail</Button>
                                  ]}>
               <List.Item.Meta
              //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}

                title={<a>{item.projectName}</a>}
                description={item.projectState}
              />
              <div>
                <div style={{width : '355px'}}>
                  <span>{item.projectLastChangeTime}</span><br/>
                  <span>{item.projectLastChangeDesc}</span>
                </div>
              </div>
            </List.Item>
          )}
        />

         <Modal
          title="Edit Project"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer = {[]}
        >
          <EditProject 
            item = {this.state.item} 
            getEditState = {this.getEditState}
          />
        </Modal>

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


      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {state : state};
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadProjectHandler: (data) => {
      dispatch(loadProject(data));
    }
  }
}
const CustomerMainListConnected = connect(mapStateToProps,mapDispatchToProps)(CustomerMainList);

export default CustomerMainListConnected;
