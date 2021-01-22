const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

(async () => {
  //Connect to the server....
  const connection = await mysql.createConnection({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });
console.log('enviroment variable',process.env.NODE_ENV) 
  //Create the database ...
  
  const createDevDb =await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_Development};`)
    
  const createTestDb = await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_TEST};`)
     
})();

//Connect to the created database ...
module.exports = new Sequelize(
  process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST : process.env.DATABASE_Development,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  }
);
