import { combineReducers } from 'redux';
import loginInfo from './loginInfo.js';
import project from './project.js';
import customerProjectFilter from './customerProjectFilter.js';


// function loginInfo (state = {
// 							loginIdendity: '',
// 							loginId: '',	
// 							timestamp: ''
// 						},action) {
// 	switch(action.type){
// 		case 'LOGIN':
// 			console.log(action)
// 	      	if(action.loginIdendity === 'admin'){
// 	      		console.log('yes')
// 	      		return{
// 	      			loginIdendity : action.loginIdendity,
// 	      			loginId : action.loginId,
// 	      			timestamp : action.timestamp
// 	      		}
// 	      	}else if(action.idendity === 'worker'){
// 	      		return{
// 	      			loginIdendity : action.loginIdendity,
// 	      			loginId : action.loginId,
// 	      			timestamp : action.timestamp
// 	      		}
// 	      	}else if(action.idendity === 'customer'){
// 	      		return{
// 	      			loginIdendity : action.loginIdendity,
// 	      			loginId : action.loginId,
// 	      			timestamp : action.timestamp
// 	      		}
// 	      	};
// 	    default:
// 	    	return state;
		
// 	}
// }


const App = combineReducers({
	loginInfo,
	project,
	customerProjectFilter
})

export default App;