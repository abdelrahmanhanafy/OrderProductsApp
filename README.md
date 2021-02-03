# OrderProductsApp
An App to order products 


Code Structure: 
Routes:  contains the routes.  
Core: contains the models of the database. 
Tests: contain the automation test for the APIS endpoints. 
Config: contains the configurations files.
Helpers: contains the helpers files.
app.js: the server file.
 
  
Used Packages: 
  "dependencies": {
    "body-parser": "^1.19.0",
    "crypto": "^1.0.1",
    "express": "^4.17.1",
    "express-validator": "^6.9.2",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "mysql": "^2.18.1",
    "mysql2": "^2.2.5",
    "prettier": "^2.2.1",
    "sequelize": "^6.4.0"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "cross-env": "^7.0.3",
    "faker": "^5.1.0",
    "mocha": "^8.2.1",
    "nodemon": "^2.0.7"
  } 
Npm Scripts: 
   "dev": "cross-env NODE_ENV=development nodemon app",
    "test": "cross-env NODE_ENV=test mocha --timeout 100000",
    "format": "prettier --write ." 

Database Connections: 
On your local machine you must have  MySql server installed.
Then in the config file config.env change the user name and the password.

Run the script the npm run dev will create two databases one for development “dev” and another for “test” in your localhost my mysql server


 
Run the App Locally through: 
http://localhost:4000   
Routes: 
 
Users Endpoints: 
POST /api/auth/register
POST /api/auth/login
 
Products Endpoints: 
GET api/products?brand=&name=&category=&offset=&limit=
POST api/products
Order Endpoints: 
POST api/orders
Provide the request body as follow:
[
     {
               "id": 1,
            "quantity":2,
             "price":5
        } ,
     {
               "id": 1,
            "quantity":2,
             "price":5
        } 

]
GET api/orders?offset=&limit=
POST api/orders/cancel/:id

