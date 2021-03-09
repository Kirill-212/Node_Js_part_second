const employees =require('../models').employees;

module.exports ={
	GetAllEmployees: async(req,res)=>{
		res.header("Content-Type","application/json");
		employees.findAll({raw:true}).then(employees=>{
			console.log(employees);
			res.send(JSON.stringify(employees));
		}).catch(err=>{		
			console.log(err);
		});
	},
	PostEmployees:async(req,res)=>{
		console.log(req.body["position"]);
		if(!req.body){
		res.status(400)
		res.send(JSON.stringify({"ERROR":"invalid data"}));
	}
	employees.create({
		name:req.body["name"],
		phone_number:req.body["phone_number"],
		position:req.body["position"],
		id_shop:req.body["id_shop"]
	}).then(res1=>{	
		res.send(JSON.stringify(req.body));
	}).catch(err=>{
		console.log(err);
		res.status(400)
		res.send(JSON.stringify({"ERROR":"invalid data"}));
	});
	},
	PutEmployees:async(request,response)=>{
		response.header("Content-Type","application/json");
		if(!request.body){
			response.status(400)
			response.send(JSON.stringify({"ERROR":"invalid data"}));
		}
		employees.update({position:request.body["position"],
			id_shop:request.body["id_shop"],
			name:request.body["name"],
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
		DeleteEmployees:async(request,response)=>{
			
			response.header("Content-Type","application/json");
			employees.destroy({
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
