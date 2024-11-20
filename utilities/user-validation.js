const { body, validationResult } = require('express-validator');

function userRules() {
  return [
    body('firstName').trim().escape().notEmpty().isLength({ min: 1 }),

    body('lastName').trim().escape().notEmpty().isLength({ min: 1 }),

    body('email')
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid email is required.'),

    body('favoriteColor').trim().escape().notEmpty().isLength({ min: 1 }),

    body('birthday')
      .isDate({ format: 'YYYY-MM-DD' })
      .custom((value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight to only compare dates

        if (today < selectedDate) {
          throw new Error('The date cannot be in the past');
        }
        return true;
      })
      .withMessage('Please enter a valid date'),
  ];
}

function validateUser(req, res, next) {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { userRules, validateUser };
