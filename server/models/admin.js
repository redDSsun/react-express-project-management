var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminSchema = new mongoose.Schema({
	userName : String,
	password : String
});

module.exports = mongoose.model('Admin', AdminSchema);