module.exports = (Sequelize,sequelize)=>{
	return sequelize.define('customer',{	
		id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true,autoIncrement: true},
			name:{type:Sequelize.STRING,allowNULL:false},
			phone_number:{type:Sequelize.STRING,allowNULL:false},
	},
	{sequelize,modelName:'customer',tableName:'customer'}
	);
}