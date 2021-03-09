module.exports = (Sequelize,sequelize)=>{
	return sequelize.define('orders',{	
		id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true,autoIncrement: true},
			id_shop:{type:Sequelize.INTEGER,references:{model:require('./shop')(Sequelize,sequelize),key:'id'}},
			id_customer:{type:Sequelize.INTEGER,references:{model:require('./customer')(Sequelize,sequelize),key:'id'}},
			id_employees:{type:Sequelize.INTEGER,references:{model:require('./employees')(Sequelize,sequelize),key:'id'}},
			costs:{type:Sequelize.INTEGER}
	},
	{sequelize,modelName:'orders',tableName:'orders'}
	);
}