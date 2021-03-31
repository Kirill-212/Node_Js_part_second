const Sequelize = require("sequelize");

const sequelize = new Sequelize("SHOP", "node_js_user", "123", {
  host: "localhost",
  dialect: "mssql",
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  dialectOptions: {
    options: {
      instanceName: "SQLEXPRESS",
      encrypt: false,
    },
  },
});

module.exports = {
  users: require("./users")(Sequelize, sequelize),
  sequelize,
  Sequelize,
};
