function customerProjectFilter (state = {
							customerProjectFilter: 'all'
						},action) {
	switch(action.type){
		case 'SET_CUSTOMER_PROJECT_FILTER':
			console.log(action)	      
	      		return{
	      			customerProjectFilter : action.data,	      	
	      		};
	    default:
	    	return state;
		
	}
}

export default customerProjectFilter;