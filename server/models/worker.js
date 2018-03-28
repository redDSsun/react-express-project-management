var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WorkerSchema = new mongoose.Schema({
	userName : String,
	password : String,
	nickName : String,
	email : String,
	phone : String,
	address : String
});

module.exports = mongoose.model('Worker', WorkerSchema);