module.exports = (Sequelize,sequelize)=>{
	return sequelize.define('employees',{	
		id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true,autoIncrement: true},
			name:{type:Sequelize.STRING,allowNULL:false},
			phone_number:{type:Sequelize.STRING,allowNULL:false},
			position:{type:Sequelize.STRING,allowNULL:false},
			id_shop:{type:Sequelize.INTEGER,references:{model:require('./shop')(Sequelize,sequelize),key:'id'}}
	},
	{sequelize,modelName:'employees',tableName:'employees'}
	);
}