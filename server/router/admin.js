var express = require('express');
var router = express.Router();
var Project = require('../models/project');
var Customer = require('../models/customer');
var Worker = require('../models/worker');
var Task = require('../models/task');



router.post('/getproject',function(req,res){
	console.log(req.body,'get')
	req.body.state ==='all' ? (
		Project.find({})
			.populate('projectOwner')
			.exec(function(err,data){
			if(err){
				res.send(err);
			}else{
				res.json({results : data});
			}
		})
		):(
		Project.find({projectState : req.body.state})
			.populate('projectOwner')
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

router.post('/refuseproject',function(req,res){
	console.log(req.body,'refuse')
	Project.update({_id : req.body._id},{
		projectLastChangeTime : req.body.projectLastChangeTime,
		projectLastChangeDesc : req.body.projectLastChangeDesc,
		projectState : req.body.projectState
	},function(err){
		if(err){
			res.send(err)
		}else{
			res.json({message : 'update success'})
		}
	})
})

router.post('/finishproject',function(req,res){
	var timestamp=new Date().getTime();
	Project.update({_id : req.body._id},{
		projectState : 'finished',
		projectLastChangeTime : timestamp,
		projectLastChangeDesc : 'project has finished'

	},function(err){
		if(err){
			res.send(err)
		}else{
			res.json({message : 'project has been finished'})
		}
	})
})

router.post('/getworker',function(req,res){
	Worker.find({})
		.exec(function(err,data){
			if(err){
				res.send(err)
			}else{
				res.json({results : data})
			}
		})
})

router.post('/deleteworker',function(req,res){
	Worker.remove({_id : req.body._id},function(err,data){
		if(err){
			res.send(err)
		}else{
			res.json({message: 'delete success!!'})
		}
	})
})



router.post('/addworker',function(req,res){
	if(req.body.userName == null){
		res.json({message : 'please input worker name!!'});
	}else{
		Worker.find({userName : req.body.userName},function(err,data){
			if(err){
				res.send(err)
			}else{
				console.log(data)
				if(data.length === 0){
					console.log('can add')
					var worker = new Worker();
					worker.userName = req.body.userName;
					worker.password = '123456'
					worker.nickName = ''
					worker.email = ''
					worker.address = ''
					worker.phone = ''
					worker.save(function(err,data){
						if(err){
							res.send(err);
						}else{
							res.json({message: 'add worker success'});
							console.log('add success')
						}
					})
				}else{
					console.log('can not add')
					res.json({message : 'worker has exist'})
				}
			}
		})
	}



})

router.post('/gettask',function(req,res){
	console.log(req.body)
	Task.find({projectId : req.body.projectId})
		.populate('projectId')
		.populate('workerId')
		.exec(function(err,data){
			if(err){
				res.send(err);
			}else{
				res.json({results : data});
			}
		})
})

router.post('/addtask',function(req,res){
	console.log(req.body)
	var task = new Task();
	task.projectId = req.body.projectId;
	task.taskName = req.body.taskName;
	task.taskInfo = req.body.taskInfo;
	task.taskDeadLine = req.body.taskDeadLine;
	task.workerId = req.body.workerId;
	task.taskState = req.body.taskState;
	task.save(function(err,data){
		if(err){
			res.send(err)
		}else{
			res.json({message: 'add task success!!'})
			var timestamp =(new Date()).valueOf();
			Project.update({_id : req.body.projectId},{
				projectState : 'in progress',
				projectLastChangeTime : timestamp,
				projectLastChangeDesc : 'project has assign task to worker'
			},function(err,data){
				if(err){
					res.send(err)
				}else{
				}
			})
		}
	})
})

router.post('/deletetask',function(req,res){
	Task.remove({_id : req.body._id},function(err,data){
		if(err){
			res.send(err)
		}else{
			res.json({message: 'delete success!!'})
		}
	})
})

router.post('/getcustomer',function(req,res){
	console.log(req.body.id + 'hahahahahahaah')
	Customer.find({},function(err,data){
		if(err){
			res.send(err)
		}else{
			res.json({results : data})
		}
	})
})

router.post('/deletecustomer',function(req,res){
	Customer.remove({_id : req.body._id},function(err,data){
		if(err){
			res.send(err)
		}else{
			res.json({message: 'delete success!!'})
		}
	})
})

router.post('/addcustomer',function(req,res){
	if(req.body.userName == null){
		res.json({message : 'please input customer name!!'});
	}
	Customer.find({userName : req.body.userName},function(err,data){
		if(err){
			res.send(err)
		}else{
			console.log(data)
			if(data.length === 0){
				console.log('can add')
				var customer = new Customer();
				customer.userName = req.body.userName;
				customer.password = '123456'
				customer.save(function(err,data){
					if(err){
						res.send(err);
					}else{
						res.json({message: 'add customer success'});
						console.log('add success')
					}
				})
			}else{
				console.log('can not add')
				res.json({message : 'customer has exist'})
			}
		}
	})


})


module.exports = router;