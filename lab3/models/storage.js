module.exports = (Sequelize,sequelize)=>{
	return sequelize.define('storage',{	
		id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true,autoIncrement: true},
		provider:{type:Sequelize.STRING,allowNULL:false},
		name_item:{type:Sequelize.STRING,allowNULL:false},
		count_item:{type:Sequelize.INTEGER},
		id_shop:{type:Sequelize.INTEGER,references:{model:require('./shop')(Sequelize,sequelize),key:'id'}}
	},
	{sequelize,modelName:'storage',tableName:'storage'}
	);
}