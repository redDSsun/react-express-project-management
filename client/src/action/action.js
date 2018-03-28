export function login(loginIdendity,loginId,loginName,timestamp){
	return{
		type : 'LOGIN',
		loginIdendity : loginIdendity,
		loginId : loginId,
		loginName : loginName,
		timestamp : timestamp
	}
}

export function loadProject(data){
	return{
		type : 'LOAD_PROJECT',
		data : data
	}
}

export function setCustomerProjectFilter(data){
	return{
		type : 'SET_CUSTOMER_PROJECT_FILTER',
		data : data
	}
}
