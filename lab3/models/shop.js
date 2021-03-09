module.exports = (Sequelize,sequelize)=>{
	return sequelize.define('shop',{	
		id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true,autoIncrement: true},
		country:{type:Sequelize.STRING,allowNULL:false}
	},
	{sequelize,modelName:'shop',tableName:'shop'}
	);
}