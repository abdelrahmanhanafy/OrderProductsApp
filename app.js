//Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

const router = require('./routes');

//Database
const db = require('./Config/database');
(async () => {
  try {
    //Test the connection
    await db.authenticate();
    console.log('Database Connected...');
    //Sync all the model of the database
    await db.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

//Load Config
dotenv.config({ path: './config/config.env' });

//Set Up A New App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//Routes
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
