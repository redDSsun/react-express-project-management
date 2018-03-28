var Project = require('./project');
var Worker = require('./worker')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = new mongoose.Schema({
	projectId : {
		type : Schema.Types.ObjectId,
		ref : 'Project'
	},
	taskName : String,
	workerId : {
		type : Schema.Types.ObjectId,
		ref : 'Worker'
	},
	taskInfo : String,
	taskDeadLine : Date,
	taskState : ''
});

module.exports = mongoose.model('Task', TaskSchema);