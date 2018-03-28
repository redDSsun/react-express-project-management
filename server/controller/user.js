var mongoose = require('mongoose');
var User = mongoose.model('user');
module.exports = (function(){
	return{
		getData:function(req,res){
			User.find({},function(err,output){
				if(err){
					console.log(err);
				}else{
					res.json(output);
				}
			})
		},
		login: function(req,res){
			
		}

	}
})()