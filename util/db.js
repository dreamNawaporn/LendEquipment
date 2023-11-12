const Sequelize = require('sequelize');
require("dotenv").config();
// console.log("asdasdasda",process.env.DATABASE, process.env.USERNAMEDB, process.env.PASSWORD);
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAMEDB, process.env.PASSWORD, {
  dialect: 'postgres',
  host: process.env.HOST
});

module.exports = sequelize;