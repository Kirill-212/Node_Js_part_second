const Sequelize = require('sequelize');
const Model = Sequelize.Model;



class customer extends Model{};
class employees extends Model{};
class orders extends Model{};
class shop extends Model{};
class storage extends Model{};
function internalORM(sequelize) {

	customer.init(
		{	
			id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true},
			name:{type:Sequelize.STRING,allowNULL:false},
			phone_number:{type:Sequelize.STRING,allowNULL:false},

		},
		{sequelize,modelName:'customer',tableName:'customer'}
	);

	employees.init(
		{	
			id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true},
			name:{type:Sequelize.STRING,allowNULL:false},
			phone_number:{type:Sequelize.STRING,allowNULL:false},
			id_shop:{type:Sequelize.INTEGER,references:{model:shop,key:'id'}}
		},
		{sequelize,modelName:'employees',tableName:'employees'}
	);
	orders.init(
		{	
			id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true},
			id_shop:{type:Sequelize.INTEGER,references:{model:Auto_parts,key:'id'}},
			id_customer:{type:Sequelize.INTEGER,references:{model:customer,key:'id'}},
			id_employees:{type:Sequelize.INTEGER,references:{model:employees,key:'id'}},
			costs:{type:Sequelize.INTEGER}
		},
		{sequelize,modelName:'orders',tableName:'orders'}
	);
	shop.init(
		{	
			id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true},
			country:{type:Sequelize.STRING,allowNULL:false}
		},
		{sequelize,modelName:'shop',tableName:'shop'}
	);
	storage.init(
		{	
			id: {type:Sequelize.INTEGER,allowNULL:false,primaryKey:true},
			provider:{type:Sequelize.STRING,allowNULL:false},
			name_item:{type:Sequelize.STRING,allowNULL:false},
			count_item:{type:Sequelize.INTEGER},
			id_shop:{type:Sequelize.INTEGER,references:{model:Auto_parts,key:'id'}}
		},
		{sequelize,modelName:'storage',tableName:'storage'}
	);
	sequelize.sync().then(()=>{
		console.log('GOOD');
	});
}

exports.ORM=(s)=>{internalORM(s); return{customer,employees,orders,shop,storage};}