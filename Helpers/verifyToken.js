const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];

      const authUser = await jwt.verify(bearerToken, process.env.JWT_SECRET);
      req.authUser = authUser;
      next();
    } else {
      throw new Error('you must provide a token in Authorization header');
    }
  } catch (err) {
    if (err) {
      throw new Error(err.message);
    }
  }
};
