var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CustomerSchema = new mongoose.Schema({
	userName : String,
	nickName : String,
	password : String,
	email : String,
	phone : String,
	address : String,
	securityQuestion : String,
	securityAnswer : String
});

module.exports = mongoose.model('Customer', CustomerSchema);