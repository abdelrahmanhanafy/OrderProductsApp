const { body } = require('express-validator');

module.exports = {
  validateUserCredentials() {
    return [
      body('email')
        .not()
        .isEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid'),
      body('password')
        .not()
        .isEmpty()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 numbers'),
    ];
  },
};
