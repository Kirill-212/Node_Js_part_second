const Sequelize = require("sequelize");



module.exports = new Sequelize("BELSTU_NODE_JS", "node_js_user", "123", {
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