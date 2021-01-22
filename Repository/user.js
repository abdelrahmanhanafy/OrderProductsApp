const User = require('../Core/user');
const crypto = require('crypto');

module.exports = class UserRepo {

  async createUser({ email, password, balance }) {
    
    //Create hashing code for the password...
    const hash = crypto.pbkdf2Sync(password, process.env.SALT, 500, 512, 'sha512').toString('hex');

    //Create the user in the db....
    const user = await User.create({ email, password: hash, balance });
    return user.toJSON();
  }
  async findByEmail(email) {

    //Find the user within the specific email
    const user = User.findOne({ where: { email } });
    return user;
  }

  validatePassword(user, password) {

    //Validate the password by hashing it and compare it with the one stored in the database...
    const hash = crypto.pbkdf2Sync(password, process.env.SALT, 500, 512, 'sha512').toString('hex');
    return user.password === hash;
  }
};
