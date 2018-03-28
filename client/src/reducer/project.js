
function project (state = [],action) {
	console.log(action.data)
	switch(action.type){
		case 'LOAD_PROJECT':
	      	return action.data
	    default:
	    	return state;
		
	}
}


export default project;