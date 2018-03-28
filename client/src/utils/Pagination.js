import React, { Component } from 'react';
import antd from 'antd';
var Pagination = antd.Pagination;

class Pagination extends Component{
	render(){
		function onChange(page) {
 	 		console.log(page);
		}
		return(
			 <Pagination showQuickJumper={true} onChange={onChange} total={500} />
			);
	}
}

export default Pagination;