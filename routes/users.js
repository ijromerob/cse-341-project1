const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userRules, validateUser } = require('../utilities/user-validation');
const { handleErrors } = require('../utilities');

router.get('/', handleErrors(userController.getAll));
router.get('/:id', handleErrors(userController.getSingle));

router.post(
  '/',
  userRules(),
  validateUser,
  handleErrors(userController.addNewUser)
);
router.put(
  '/:id',
  userRules(),
  validateUser,
  handleErrors(userController.updateUser)
);
router.delete('/:id', handleErrors(userController.deleteUser));

module.exports = router;
