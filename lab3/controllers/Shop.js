const shop =require('../models').shop;

module.exports ={
	GetAllShop: async(req,res)=>{
		res.header("Content-Type","application/json");
		shop.findAll({raw:true}).then(shop=>{
			console.log(shop);
			res.send(JSON.stringify(shop));
		}).catch(err=>{		
			console.log(err);
		});
	},
	PostShop:async(req,res)=>{
		
		if(!req.body){
		res.status(400)
		res.send(JSON.stringify({"ERROR":"invalid data"}));
	}
	shop.create({
		country:req.body["country"]
	}).then(res1=>{	
		res.send(JSON.stringify(req.body));
	}).catch(err=>{
		console.log(err);
		res.status(400)
		res.send(JSON.stringify({"ERROR":"invalid data"}));
	});
	},
	PutShop:async(request,response)=>{
		response.header("Content-Type","application/json");
		if(!request.body){
			response.status(400)
			response.send(JSON.stringify({"ERROR":"invalid data"}));
		}
		shop.update({country:request.body["country"]},{
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
		DeleteShop:async(request,response)=>{
			
			response.header("Content-Type","application/json");
			shop.destroy({
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