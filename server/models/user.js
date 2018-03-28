//model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	name : String,
	task : String,
	IsIntern : Boolean,
});

module.exports = mongoose.model('User', UserSchema);