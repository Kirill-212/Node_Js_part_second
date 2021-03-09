const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("./DBconfig.js");

class DataBase{
	constructor(){

		this.FACULTY = sequelize.define("FACULTY",{
			FACULTY:{
				type: DataTypes.CHAR(10),
				primaryKey:true,
				allowNULL:false
			},
			FACULTY_NAME:{
				type: DataTypes.STRING(50)
			}
		},{hooks:{
			beforeCreate:(instance,options)=>{console.log('---- beforeCreate ----');},
			afterCreate:(instance,options)=>{console.log('---- afterCreate ----');}
		},sequelize,
			tableName:"FACULTY",
			modelName:'FACULTY'});


		this.PULPIT = sequelize.define("PULPIT",{
			PULPIT:{
				type: DataTypes.CHAR(10),
				primaryKey:true,
				allowNULL:false
			},
			PULPIT_NAME:{
				type: DataTypes.STRING(100)
			},
			FACULTY:{
				type: DataTypes.CHAR(10),
				allowNULL:false,references:{model: this.FACULTY,key:'FACULTY'}
			}
		},{sequelize,
			tableName:"PULPIT",
			modelName:'PULPIT'});

		this.TEACHER = sequelize.define("TEACHER",{
			TEACHER:{
				type: DataTypes.CHAR(10),
				primaryKey:true,
				allowNULL:false
			},
			TEACHER_NAME:{
				type: DataTypes.STRING(50)
			},
			PULPIT:{
				type: DataTypes.CHAR(10),
				allowNULL:false,references:{model: this.PULPIT,key:'PULPIT'}
			}
		},{sequelize,
			tableName:"TEACHER",
			modelName:'TEACHER'});

		this.SUBJECT = sequelize.define("SUBJECT",{
			SUBJECT:{
				type: DataTypes.CHAR(10),
				primaryKey:true,
				allowNULL:false
			},
			SUBJECT_NAME:{
				type: Sequelize.STRING(50),
				allowNULL:false
			},
			PULPIT:{
				type: DataTypes.CHAR(10),
				allowNULL:false,references:{model: this.PULPIT,key:'PULPIT'}
			}
		},{sequelize,
			tableName:"SUBJECT",
			modelName:'SUBJECT'});

		this.AUDITORIUM_TYPE = sequelize.define("AUDITORIUM_TYPE",{
			AUDITORIUM_TYPE:{
				type: DataTypes.CHAR(10),
				primaryKey:true,
				allowNULL:false
			},
			AUDITORIUM_TYPENAME:{
				type: DataTypes.STRING(30),
				allowNULL:false
			}
		},{sequelize,
			tableName:"AUDITORIUM_TYPE",
			modelName:'AUDITORIUM_TYPE'});


		this.AUDITORIUM = sequelize.define("AUDITORIUM",{
			AUDITORIUM:{
				type: DataTypes.CHAR(10),
				primaryKey:true,
				allowNULL:false
			},
			AUDITORIUM_NAME:{
				type: DataTypes.STRING(200),

			},
			AUDITORIUM_CAPACITY:{
				type: DataTypes.INTEGER,

			},
			AUDITORIUM_TYPE:{
				type: DataTypes.CHAR(10),
				allowNULL:false,references:{model: this.AUDITORIUM_TYPE,key:'AUDITORIUM_TYPE'}
			}
	
},{scopes:{auditoriumsgt60:{
	where:{AUDITORIUM_CAPACITY : {[Sequelize.Op.gt]:60}}
}}
,sequelize,
tableName:"AUDITORIUM",
modelName:'AUDITORIUM'});

		sequelize.sync().then(()=>{
			console.log("GOOD");
		}).catch(err=>console.log(err));
	};


}
module.exports=DataBase;