var express = require('express');
var router = express.Router();
var Project = require('../models/project');
var Customer = require('../models/customer');
var Task = require('../models/task')
var Worker = require('../models/worker')
var path=require('path');



router.post('/addproject',function(req,res){
	var project = new Project();
	project.projectName = req.body.projectName;
	project.projectOwner = req.body.projectOwner;
	project.projectInfo = req.body.projectInfo;
	project.projectBudget = req.body.projectBudget;
	project.projectNewTime = req.body.projectNewTime;
	project.projectDeadline = req.body.projectDeadline;
	project.projectLastChangeTime = req.body.projectLastChangeTime;
	project.projectLastChangeDesc = req.body.projectLastChangeDesc;
	project.projectState = req.body.projectState;
	project.projectChangeToAdmin = req.body.projectChangeToAdmin;
	project.projectChangeToUser = req.body.projectChangeToUser;
	project.projectChangeToCustomer = req.body.projectChangeToCustomer;
	project.save(function(err,data){
		if(err){
			res.send(err);
		}else{
			res.json({message: 'add project success'});
			console.log('add success')
		}
	})
})

router.post('/gettask',function(req,res){
	console.log(req.body.workerId,'haha',req.body.state)
	req.body.state ==='all' ? (
		Task.find({workerId : req.body.workerId})
			.exec(function(err,data){
			if(err){
				res.send(err);
			}else{
				// console.log(data)
				res.json({results : data});
			}
		})
		):(
		Task.find({workerId : req.body.workerId,taskState : req.body.state})
			// .where('projectState').equals(req.body.state)
			.exec(function(err,data){
			if(err){
				res.send(err);
			}else{
				console.log(data)
				res.json({results : data});
			}
		})
		)
})

router.post('/starttask',function(req,res){
	Task.update({_id : req.body.id},{taskState : 'in progress'},function(err,data){
		if(err){
			res.send(err)
		}else{
			res.json({message : 's'})
			console.log('start success')
		}
	})
})

router.post('/finishtask',function(req,res){
	Task.update({_id : req.body.id},{taskState : 'finished'},function(err,data){
		if(err){
			res.send(err)
		}else{
			res.json({message : 's'})
			console.log('finish success')
		}
	})
})


router.post('/getworker',function(req,res){
	console.log(req.body._id)
		Worker.findOne({_id: req.body._id},function(err,data){
			if(err){
				res.send(err);
			}else{
				console.log(data)
				res.json({data : data})
			}
		})
})


router.post('/updateworker',function(req,res){
	console.log(req.body)
	Worker.update({_id : req.body._id},
		{
			nickName: req.body.nickName,
			email: req.body.email,
			phone: req.body.phone,
			address: req.body.address
		},function(err){
			if(err){
				res.send(err)
			}else{
				res.json({message : 'update success'})
			}
	})
})



router.post('/changepassword',function(req,res){
	console.log(req.body.state)
		Worker.findOne({_id: req.body._id},function(err,data){
			if(err){
				res.send(err);
			}else{
				if(data.password === req.body.oldPassword){
					Customer.update({_id: req.body._id},{password : req.body.newPassword},function(err){
						if(err){
							res.send(err)
						}else{
							res.json({message :'password update success'});
						}
					})				
				}else{
					res.json({message: 'old password is wrong'})
				}
			}
		})
})














router.post('/getuser',function(req,res){
		Customer.findOne({_id: req.body.loginId},function(err,data){
			if(err){
				res.send(err);
			}else{
				console.log(data)
				res.json({data : data})
			}
		})
})

router.post('/updatecustomer',function(req,res){
	Customer.update({_id : req.body.loginId},
		{
			nickName: req.body.nickName,
			email: req.body.email,
			phone: req.body.phone,
			address: req.state.address
		},function(err){
			if(err){
				res.send(err)
			}else{
				res.json({message : 'update success'})
			}
	})
})

router.post('/deleteproject',function(req,res){
	Project.remove({_id : req.body.id},function(err){
			if(err){
				res.send(err)
			}else{
				res.json({message : 'delete success'})
			}
	})
})


router.post('/editproject',function(req,res){
	console.log(req.body)
	Project.update({_id : req.body._id},{
		projectName : req.body.projectName,
		projectInfo : req.body.projectInfo,
		projectBudget : req.body.projectBudget,
		projectDeadline  : req.body.projectDeadline,
		projectLastChangeTime : req.body.projectLastChangeTime,
		projectLastChangeDesc : req.body.projectLastChangeDesc
	},function(err){
			if(err){
				res.send(err)
			}else{
				res.json({message : 'edit success'})
			}
	})
})

module.exports = router;