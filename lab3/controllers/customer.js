const customer =require('../models').customer;
const path =require('path');
module.exports ={
	GetPage: async(req,res)=>{
		
		res.render('page.hbs',{layout:false});
	},
	GetAllCustomer: async(req,res)=>{
		res.header("Content-Type","application/json");
		customer.findAll({raw:true}).then(customer=>{
			console.log(customer);
			res.send(JSON.stringify(customer));
		}).catch(err=>{		
			console.log(err);
		});
	},
	PostCustomer:async(req,res)=>{
		
		if(!req.body){
			res.status(400)
			res.send(JSON.stringify({"ERROR":"invalid data"}));
		}
		customer.create({
			name:req.body["name"],
			phone_number:req.body["phone_number"]
		}).then(res1=>{	
			res.send(JSON.stringify(req.body));
		}).catch(err=>{
			console.log(err);
			res.status(400)
			res.send(JSON.stringify({"ERROR":"invalid data"}));
		});
	},
	PutCustomer:async(request,response)=>{
		response.header("Content-Type","application/json");
		if(!request.body){
			response.status(400)
			response.send(JSON.stringify({"ERROR":"invalid data"}));
		}
		customer.update({name:request.body["name"],
			phone_number:request.body["phone_number"]},{
				where:{id:request.body["id"]}
			}).then(res=>{
				if(res==0){
					response.status(400)
					response.send(JSON.stringify({"ERROR":"invalid data"}));
				}
				response.json(request.body);
			}).catch(err=>{
				response.status(400)
				response.send(JSON.stringify({"ERROR":"invalid data"}));
			});
		},
		DeleteCustomer:async(request,response)=>{
			
			response.header("Content-Type","application/json");
			customer.destroy({
				where :{
					id:request.params["ID"]
				}
			}).then(res=>{
				console.log(res);
				if(res==0){response.status(400)
					response.send(JSON.stringify({"ERROR":"invalid data"}));}
					response.send(JSON.stringify(res));
					
				}).catch(err=>{
					response.status(400)
					response.send(JSON.stringify({"ERROR":"invalid data"}));
				});

			}
		}