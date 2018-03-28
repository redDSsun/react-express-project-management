const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mytest', function(error){
    if(error) console.log(error);
    console.log("connection successful");
});

// var MyModel = mongoose.model('Test', new Schema({ name: String }));
// MyModel.find(function(error, result) { if(err){res.send(err);} res.json({'test':'OK'}) });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//use body-parser
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var index = require('./router/index');
app.use('/',index);

var customer = require('./router/customer');
app.use('/customer',customer);

var admin = require('./router/admin');
app.use('/admin',admin);

var worker = require('./router/worker');
app.use('/worker', worker);



// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/public')));

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});