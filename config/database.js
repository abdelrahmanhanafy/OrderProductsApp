const Sequelize = require('sequelize');

module.exports = new Sequelize('nodeSql', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
