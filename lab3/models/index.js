const Sequelize=require('sequelize');

const sequelize = new Sequelize("SHOP", "node_js_user", "123", {
	host: "localhost",
	dialect: "mssql",
	define: {
		timestamps: false
	},pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	dialectOptions: {
		options: {
			instanceName: "SQLEXPRESS",
			encrypt: false,
		},
	},
});


module.exports = {
	shop:require('./shop')(Sequelize,sequelize),
	customer:require('./customer')(Sequelize,sequelize),
	employees:require('./employees')(Sequelize,sequelize),
	storage:require('./storage')(Sequelize,sequelize),
	orders:require('./orders')(Sequelize,sequelize),
	sequelize,Sequelize
};