const express = require('express');
const jwt = require('jsonwebtoken');
const schema = require('./schema');
const UserRepo = require('../../Repository/user');
const User = require('../../Core/user');

const userRepo = new UserRepo();
const router = express.Router();

router.post('/register', schema.validateUserCredentials(), async (req, res) => {
  try {
 
    //get the user data from request body...
    const { email, password, balance } = req.body;
 
    //Check the if the user is already registered...
    const userFound = await userRepo.findByEmail(email);
    if (userFound) throw new Error('User already registered');

    //Create the user in the database...
    const user = await userRepo.createUser({
      email: email && email.toLowerCase(),
      password,
      balance,
    });

    res.send(user);
  } catch (err) {
    res.status(400).send(`Something went wrong`);
  }
});

router.post('/login', schema.validateUserCredentials(), async (req, res) => {
  try {

    //get the user data from request body...
    const { email, password } = req.body;

    //Check if the user is registered... 
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('User not registered');

    //Check if the correctness of the user's password...
    if (!userRepo.validatePassword(user, password)) throw new Error('Authentication failure');

    //Create the token and send it to the user...
    const accessToken = await jwt.sign(
      { id: user.id, email: user.email, balance: user.balance },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.send({ accessToken });
    
  } catch (err) {
    console.log(err);
    res.status(400).send(`Something went wrong`);
  }
});

module.exports = router;
