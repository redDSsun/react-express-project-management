var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Admin = require('../models/admin');
var Worker = require('../models/worker');
var Customer = require('../models/customer');
var path=require('path');


router.get('/', function(req, res){
    res.json({loginState:'hello'}); // change the path to your index.html
});

// router.get('/getData', function(req, res) {
// 	User.find({}, function(err, data) {
// 		if(err) {
// 			res.send(err);
// 		}
// 		console.log(data);
// 		// res.json(data);
// 		res.json(data);
// 	});
// 	// res.json({'msg':'hello'});
// });

// router.post('/postData',function(req, res) {
// 	var user = new User();
// 	user.name = 'new user' + Math.floor(Math.random() * 100);
// 	user.task = 'new task' + Math.floor(Math.random() * 100);
// 	user.IsIntern = [true, false][Math.floor((Math.random() * 1) + 1)];

// 	user.save(function(err) {
// 		if (err)
// 			res.send(err);
// 		res.json({ loginState: 'User successfully added!' });
// 	});
// });


router.post('/adminLogin',function(req,res){
	console.log('11111111111')
	Admin.findOne({userName: req.body.userName},function(err,data){
		if(err){
			res.send(err);
		}else{
			if(data === null){
				res.json({loginState: 'you need regist'})
			}else{
				if(data.password === req.body.password){
					res.json({loginIdendity: 'admin',loginId: data._id,loginName : data.userName,loginState : 'adminSuccess'});
				}else{
					res.json({loginState: 'password is wrong!'});
				}
			} 
		}
	})
})

router.post('/workerLogin',function(req,res){
	Worker.findOne({userName: req.body.userName},function(err,data){
		if(err){
			res.send(err);
		}else{
			// console.log(data);
			// console.log(req.body.userName);
			if(data === null){
				res.json({loginState: 'you need regist'});
			}else{
				if(data.password === req.body.password){
					res.json({loginIdendity: 'worker',loginId: data._id,loginName : data.userName,loginState : 'workerSuccess'});
				}else{
					res.json({loginState: 'password is wrong!'});
				}
			} 
		}
	})
})

router.post('/customerLogin',function(req,res){
	Customer.findOne({userName: req.body.userName},function(err,data){
		if(err){
			res.send(err);
		}else{
			// console.log(req.body.userName);
			// console.log(data);
			if(data === null){				
				res.json({loginState: 'you need regist'});
			}else{
				if(data.password === req.body.password){
					res.json({loginIdendity: 'customer',loginId: data._id,loginName : data.userName,loginState : 'customerSuccess'})
				}else{
					res.json({loginState: 'password is wrong!'});
				}
			} 
		}
	})
})

router.post('/workerRegist',function(req,res){
	Worker.findOne({userName: req.body.userName},function(err,data){
		if(err){
			res.send(err);
		}else{
			console.log(data)
			if(data !== null){
				res.json({message:'user has been exist'});
			}else{
					var worker = new Worker();
					worker.userName = req.body.userName;
					worker.password = req.body.password;
					worker.save(function(err) {
						if (err)
							res.send(err);
						res.json({ message: 'worker successfully added!' });
					});
			}
		}
	})
})

module.exports = router;



	