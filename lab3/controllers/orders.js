const orders =require('../models').orders;

module.exports ={
	GetAllOrders: async(req,res)=>{
		res.header("Content-Type","application/json");
		orders.findAll({raw:true}).then(orders=>{
			console.log(orders);
			res.send(JSON.stringify(orders));
		}).catch(err=>{		
			console.log(err);
		});
	},
	PostOrders:async(req,res)=>{
		
		if(!req.body){
		res.status(400)
		res.send(JSON.stringify({"ERROR":"invalid data"}));
	}
	orders.create({
		id_shop:req.body["id_shop"],
		id_employees:req.body["id_employees"],
		id_customer:req.body["id_customer"],
		costs:req.body["costs"],
	}).then(res1=>{	
		res.send(JSON.stringify(req.body));
	}).catch(err=>{
		console.log(err);
		res.status(400)
		res.send(JSON.stringify({"ERROR":"invalid data"}));
	});
	},
	PutOrders:async(request,response)=>{
		response.header("Content-Type","application/json");
		if(!request.body){
			response.status(400)
			response.send(JSON.stringify({"ERROR":"invalid data"}));
		}
		orders.update({id_employees:request.body["id_employees"],
			id_shop:request.body["id_shop"],
			id_customer:request.body["id_customer"],
			costs:request.body["costs"]},{
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
		DeleteOrders:async(request,response)=>{
			
			response.header("Content-Type","application/json");
			orders.destroy({
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