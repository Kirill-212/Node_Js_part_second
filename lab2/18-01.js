const express = require("express");
const {Sequelize,DataTypes} = require("sequelize");
const DB =require("./DB.js");
const database=new DB();
const sequelize = require("./DBconfig.js");

const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();


app.post("/api/faculties",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){
		WriteError(request,response);
	}
	database.FACULTY.create({
		FACULTY:request.body["FACULTY"],
		FACULTY_NAME:request.body["FACULTY_NAME"]
	}).then(res=>{	
		response.json(request.body);
		console.log(res);
	}).catch(err=>{
		WriteError(request,response);
	});
});


app.post("/api/pulpits",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	console.log(request.body);
	if(!request.body){
		WriteError(request,response);
	}
	database.FACULTY.findByPk(request.body["FACULTY"]).then(result=>{
		if(!result) {			
			WriteError(request,response);
		}
		database.PULPIT.create({
			PULPIT:request.body["PULPIT"],
			PULPIT_NAME:request.body["PULPIT_NAME"],
			FACULTY:request.body["FACULTY"]
		}).then(res=>{
			response.json(request.body);
		}).catch(err=>{
			WriteError(request,response);
		});
	}).catch(err=>{
		WriteError(request,response);
	});


});
app.post("/api/subjects",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){
		WriteError(request,response);
	}
	database.PULPIT.findByPk(request.body["PULPIT"]).then(result=>{
		if(!result) {			
			WriteError(request,response);
		}
		database.SUBJECT.create({
			SUBJECT:request.body["SUBJECT"],
			SUBJECT_NAME:request.body["SUBJECT_NAME"],
			PULPIT:request.body["PULPIT"]
		}).then(res=>{
			response.json(request.body);
		}).catch(err=>{
			WriteError(request,response);
		});
	}).catch(err=>{
		WriteError(request,response);
	});
	

});
app.post("/api/auditoriumstypes",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){
		WriteError(request,response);
	}
	database.AUDITORIUM_TYPE.create({
		AUDITORIUM_TYPE:request.body["AUDITORIUM_TYPE"],
		AUDITORIUM_TYPENAME:request.body["AUDITORIUM_TYPENAME"]
	}).then(res=>{
		console.log(res + "-------------------");
		response.json(request.body);
		console.log(res);
	}).catch(err=>{
		WriteError(request,response);
	});
	

});
app.post("/api/auditoriums",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){
		WriteError(request,response);
	}

	database.AUDITORIUM_TYPE.findByPk(request.body["AUDITORIUM_TYPE"]).then(result=>{
		if(!result) {		
			WriteError(request,response);
		}
		database.AUDITORIUM.create({
			AUDITORIUM:request.body["AUDITORIUM"],
			AUDITORIUM_NAME:request.body["AUDITORIUM_NAME"],
			AUDITORIUM_CAPACITY:request.body["AUDITORIUM_CAPACITY"],
			AUDITORIUM_TYPE:request.body["AUDITORIUM_TYPE"]
		}).then(res=>{
			response.json(request.body);
			console.log(res);
		}).catch(err=>{
			WriteError(request,response);
		});
	}).catch(err=>{
		WriteError(request,response);
	});
	

});


app.post("/api/teachers",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){
		WriteError(request,response);
	}
	database.PULPIT.findByPk(request.body["PULPIT"]).then(result=>{
		if(!result) {			
			WriteError(request,response);
		}
		database.TEACHER.create({
			TEACHER:request.body["TEACHER"],
			TEACHER_NAME:request.body["TEACHER_NAME"],
			PULPIT:request.body["PULPIT"]
		}).then(res=>{
			response.json(request.body);
			console.log(res);
		}).catch(err=>{
			WriteError(request,response);
		});
	}).catch(err=>{
		WriteError(request,response);
	});
	

});



app.get("/api/auditoriumsgt60",function(request, response) {
	response.header("Content-Type","application/json");
	database.AUDITORIUM.scope('auditoriumsgt60').findAll().then(result=>{
		response.send(JSON.stringify(result));
	});
	
});

app.get("/", function(request, response){
	response.sendFile(__dirname + "/index.html");
});

app.get("/transaction", function(request, response){
	let result;
	sequelize.authenticate().
	then(()=>{console.log('connect');})
	.then(()=>{
		return sequelize.transaction({isolationLevel:Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED})
		.then(async t=>{
			return await database.AUDITORIUM.update({AUDITORIUM_CAPACITY:0},{where:{AUDITORIUM_CAPACITY:
				{[Sequelize.Op.gt]:0}},transaction:t})
			.then((r)=>{console.log('-commit',r); setTimeout(() => {return t.rollback();}, 10000);	})
			.catch((e)=>{console.log('---rollback',e );return t.rollback();});
		})
	})
});
//setTimeout(() => {return t.rollback();}, 10000);
app.get("/api/faculties",function(request, response) {
	response.header("Content-Type","application/json");
	database.FACULTY.findAll({raw:true}).then(faculties=>{
		response.send(JSON.stringify(faculties));
	}).catch(err=>{		
		WriteError(request,response);
	});
});
app.get("/api/pulpits",function(request, response) {
	response.header("Content-Type","application/json");
	database.PULPIT.findAll({raw:true}).then(pulpits=>{
		response.send(JSON.stringify(pulpits));
	}).catch(err=>{			
		WriteError(request,response);});
});
app.get("/api/subjects",function(request, response) {
	response.header("Content-Type","application/json");
	database.SUBJECT.findAll({raw:true}).then(subjects=>{
		response.send(JSON.stringify(subjects));
	}).catch(err=>{			
		WriteError(request,response);
	});
});
app.get("/api/auditoriumstypes",function(request, response) {
	response.header("Content-Type","application/json");
	database.AUDITORIUM_TYPE.findAll({raw:true}).then(auditoriumstypes=>{
		response.send(JSON.stringify(auditoriumstypes));
	}).catch(err=>{			
		WriteError(request,response);
	});
});
app.get("/api/auditoriums",function(request, response) {
	response.header("Content-Type","application/json");
	database.AUDITORIUM.findAll({raw:true}).then(auditoriums=>{
		response.send(JSON.stringify(auditoriums));
	}).catch(err=>{		
		WriteError(request,response);
	});
});

app.get("/api/faculties/:ID/pulpits",function(request, response) {
	response.header("Content-Type","application/json");
	let result=[];
	console.log(request.params["ID"]);
	database.FACULTY.hasMany(database.PULPIT,{as:'FACULTY_PULPIT',foreignKey:'FACULTY',
		sourceKet:'FACULTY'});
	database.FACULTY.findAll({
		include:[
		{model:database.PULPIT,as:'FACULTY_PULPIT',required:true}],where:{FACULTY:request.params["ID"]},raw:true
	}).then(p=>{
		p.forEach(elf=>{
			result=result.concat(elf);
		})
		return result;
	}).then(q=>{response.send(JSON.stringify(result));})
});

app.get("/api/faculties/:ID/teachers",function(request, response) {
	response.header("Content-Type","application/json");
	Select(request, response);
});

async function Select(request, response) {
	let result = [];
	database.FACULTY.hasMany(database.PULPIT,{as:'FACULTY_PULPIT',foreignKey:'FACULTY',
		sourceKet:'FACULTY'});
	database.PULPIT.hasMany(database.TEACHER,{as:'PULPIT_TEACHER',foreignKey:'PULPIT',
		sourceKet:'PULPIT'});
	database.FACULTY.findAll({
		include:[
		{model:database.PULPIT,as:'FACULTY_PULPIT',required:true}],where:{FACULTY:request.params["ID"]},raw:true
	}).then(async p=>{
		for(i=0;i<p.length;i++){
			await	database.PULPIT.findAll({
				include:[
				{model:database.TEACHER,as:'PULPIT_TEACHER',required:true}],where:{PULPIT:p[i]["FACULTY_PULPIT.PULPIT"]},raw:true
			}).then(q=>{
				result=result.concat(q);
				//console.log(result);
			})
			console.log(result);
		}
		return result;
	}).then(res=>{
		response.send(JSON.stringify(res));
	})
}

app.put("/api/faculties",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){
		WriteError(request,response);
	}
	database.FACULTY.update({FACULTY_NAME:request.body["FACULTY_NAME"]},{
		where:{FACULTY:request.body["FACULTY"]}
	}).then(res=>{
		if(res==0)WriteError(request,response);
		response.json(request.body);
	}).catch(err=>{
		WriteError(request,response);
	});
	
});
app.put("/api/pulpits",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){
		WriteError(request,response);
	}
	database.FACULTY.findByPk(request.body["FACULTY"]).then(result=>{
		if(!result) {		
			WriteError(request,response);
		}
		database.PULPIT.update({PULPIT_NAME:request.body["PULPIT_NAME"],
			FACULTY:request.body["FACULTY"]},{
				where:{PULPIT:request.body["PULPIT"]}
			}).then(res=>{
				if(res==0)WriteError(request,response);
				response.json(request.body);
			}).catch(err=>{
				WriteError(request,response);
			});
		}).catch(err=>{
			WriteError(request,response);
		});

	});
app.put("/api/subjects",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){
		WriteError(request,response);
	}
	database.PULPIT.findByPk(request.body["PULPIT"]).then(result=>{
		if(!result) {			WriteError(request,response);}
		database.SUBJECT.update({SUBJECT_NAME:request.body["SUBJECT_NAME"],
			PULPIT:request.body["PULPIT"]},{where:{SUBJECT:request.body["SUBJECT"]}})
		.then(res=>{
			if(res==0)WriteError(request,response);
			response.json(request.body);
		}).catch(err=>{
			WriteError(request,response);
		});
	}).catch(err=>{
		WriteError(request,response);
	});


});
app.put("/api/auditoriumstypes",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){
		WriteError(request,response);
	}
	database.AUDITORIUM_TYPE.update({AUDITORIUM_TYPENAME:request.body["AUDITORIUM_TYPENAME"]},{where:{
		AUDITORIUM_TYPE:request.body["AUDITORIUM_TYPE"]
	}}).then(res=>{
		if(res==0)WriteError(request,response);
		response.json(request.body);
	}).catch(err=>{
		WriteError(request,response);
	});


});
app.put("/api/auditoriums",jsonParser,function(request,response) {
	response.header("Content-Type","application/json");
	if(!request.body){WriteError(request,response);}

	database.AUDITORIUM_TYPE.findByPk(request.body["AUDITORIUM_TYPE"]).then(result=>{
		if(!result) {	WriteError(request,response);}
		database.AUDITORIUM.update({AUDITORIUM_NAME:request.body["AUDITORIUM_NAME"],
			AUDITORIUM_CAPACITY:request.body["AUDITORIUM_CAPACITY"],
			AUDITORIUM_TYPE:request.body["AUDITORIUM_TYPE"]},{where:{
				AUDITORIUM:request.body["AUDITORIUM"]
			}}).then(res=>{
				if(res==0)WriteError(request,response);
				response.json(request.body);
			}).catch(err=>{
				WriteError(request,response);
			});
		}).catch(err=>{
			WriteError(request,response);
		});

	});


app.delete("/api/faculties/:ID",function(request, response) {
	response.header("Content-Type","application/json");
	var send_result;
	database.FACULTY.findAll({where:{FACULTY:request.params["ID"]},raw:true}).then(
		faculties=>{
			send_result=faculties;
			database.FACULTY.destroy({
				where :{
					FACULTY:request.params["ID"]
				}
			}).then(res=>{
				if(res==0)WriteError(request,response);
				response.send(JSON.stringify(send_result));
				console.log(res);
			}).catch(err=>{
				WriteError(request,response);
			});
		}).catch(err=>{
			WriteError(request,response);
		})
	});
app.delete("/api/pulpits/:ID",function(request, response) {
	console.log(request.params["ID"]);
	response.header("Content-Type","application/json");
	var send_result;
	database.PULPIT.findAll({where:{PULPIT:request.params["ID"]},raw:true}).then(
		faculties=>{
			send_result=faculties;
			console.log(faculties);
			database.PULPIT.destroy({
				where :{
					PULPIT:request.params["ID"]
				}
			}).then(res=>{
				if(res==0)WriteError(request,response);
				response.send(JSON.stringify(send_result));
				console.log(res);
			}).catch(err=>{
				console.log(err);
				WriteError(request,response);
			});
		}).catch(err=>{
			console.log(err);
			WriteError(request,response);
		})
	});
app.delete("/api/subjects/:ID",function(request, response) {
	response.header("Content-Type","application/json");
	var send_result;
	database.SUBJECT.findAll({where:{SUBJECT:request.params["ID"]},raw:true}).then(
		faculties=>{
			send_result=faculties;
			database.SUBJECT.destroy({
				where :{
					SUBJECT:request.params["ID"]
				}
			}).then(res=>{
				if(res==0)WriteError(request,response);
				response.send(JSON.stringify(send_result));
				console.log(res);
			}).catch(err=>{
				WriteError(request,response);
			});
		}).catch(err=>{
			WriteError(request,response);
		})
	});
app.delete("/api/auditoriumtypes/:ID",function(request, response) {
	response.header("Content-Type","application/json");
	var send_result;
	database.AUDITORIUM_TYPE.findAll({where:{AUDITORIUM_TYPE:request.params["ID"]},raw:true}).then(
		faculties=>{
			send_result=faculties;
			database.AUDITORIUM_TYPE.destroy({
				where :{
					AUDITORIUM_TYPE:request.params["ID"]
				}
			}).then(res=>{
				if(res==0)WriteError(request,response);
				response.send(JSON.stringify(send_result));
				console.log(res);
			}).catch(err=>{
				WriteError(request,response);
			});
		}).catch(err=>{
			WriteError(request,response);
		})
	});
app.delete("/api/auditoriums/:ID",function(request, response) {
	response.header("Content-Type","application/json");
	var send_result;
	database.AUDITORIUM.findAll({where:{AUDITORIUM:request.params["ID"]},raw:true}).then(
		faculties=>{
			send_result=faculties;
			database.AUDITORIUM.destroy({
				where :{
					AUDITORIUM:request.params["ID"]
				}
			}).then(res=>{
				if(res==0)WriteError(request,response);
				response.send(JSON.stringify(send_result));
				console.log(res);
			}).catch(err=>{
				WriteError(request,response);
			});
		}).catch(err=>{
			WriteError(request,response);
		})
	});

WriteError=(request,response)=>{
	response.status(400)
	response.send(JSON.stringify({"ERROR":"invalid data"}));
	response.end();
};

app.listen(3000);