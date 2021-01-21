const User = require('../Core/user');
const crypto = require('crypto');

module.exports = class UserRepo {
  async createUser({ email, password, balance }) {
    const hash = crypto.pbkdf2Sync(password, process.env.SALT, 500, 512, 'sha512').toString('hex');
    const user = await User.create({ email, password: hash, balance });
    return user.toJSON();
  }
  async findByEmail(email) {
    const user = User.findOne({ where: { email } });
    return user;
  }

  validatePassword(user, password) {
    const hash = crypto.pbkdf2Sync(password, process.env.SALT, 500, 512, 'sha512').toString('hex');
    return user.password === hash;
  }
};
