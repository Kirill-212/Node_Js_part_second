const storage =require('../models').storage;

module.exports ={
	
	GetAllStorage: async(req,res)=>{
		res.header("Content-Type","application/json");
		storage.findAll({raw:true}).then(storage=>{
			console.log(storage);
			res.send(JSON.stringify(storage));
		}).catch(err=>{		
			console.log(err);
		});
	},
	PostStorage:async(req,res)=>{
		
		if(!req.body){
		res.status(400)
		res.send(JSON.stringify({"ERROR":"invalid data"}));
	}
	storage.create({
		id_shop:req.body["id_shop"],
		provider:req.body["provider"],
		name_item:req.body["name_item"],
		count_item:req.body["count_item"]
	}).then(res1=>{	
		res.send(JSON.stringify(req.body));
	}).catch(err=>{
		console.log(err);
		res.status(400)
		res.send(JSON.stringify({"ERROR":"invalid data"}));
	});
	},
	PutStorage:async(request,response)=>{
		response.header("Content-Type","application/json");
		if(!request.body){
			response.status(400)
			response.send(JSON.stringify({"ERROR":"invalid data"}));
		}
		storage.update({provider:request.body["provider"],
			id_shop:request.body["id_shop"],
			name_item:request.body["name_item"],
			count_item:request.body["count_item"]},{
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
		DeleteStorage:async(request,response)=>{
			
			response.header("Content-Type","application/json");
			storage.destroy({
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