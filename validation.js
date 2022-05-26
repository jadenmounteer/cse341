const { check } = require('express-validator');

exports.createContactValidation = [
  check('firstName', 'Name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty().isEmail(),
  check('favoriteColor', 'Favorite color is required').not().isEmpty(),
  check('birthday', 'Birthday is required').not().isEmpty(),
];
