const Sequelize = require('sequelize');


module.exports = new Sequelize('nodemysql', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });

