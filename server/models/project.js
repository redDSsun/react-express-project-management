var Customer = require('./customer');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProjectSchema = new mongoose.Schema({
	projectName : String,
	projectOwner : {
		type : Schema.Types.ObjectId,
		ref : 'Customer'
	},
	projectInfo : String,
	projectBudget : Number,
	projectNewTime : Date,
	projectDeadline : Date,
	projectState : String,
	projectLastChangeTime : Date,
	projectLastChangeDesc : String,
	projectChangeToAdmin : Boolean,
	projectChangeToUser : Boolean,
	projectChangeToCustomer : Boolean
});


module.exports = mongoose.model('Project', ProjectSchema);