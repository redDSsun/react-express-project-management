function loginInfo (state = {
							loginIdendity: '',
							loginId: '',	
							timestamp: ''
						},action) {
	switch(action.type){
		case 'LOGIN':
			console.log(action)	      
	      		return{
	      			loginIdendity : action.loginIdendity,
	      			loginId : action.loginId,
	      			loginName : action.loginName,
	      			timestamp : action.timestamp	      	
	      		};
	     case 'LOGOUT':
	     	return{
	     		loginIdendity : '',
	     		loginId : '',
	     		loginName : '',
	     		timestamp : ''
	     	}
	    default:
	    	return state;
		
	}
}

export default loginInfo;