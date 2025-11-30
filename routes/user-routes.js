const express = require('express');
const userController = require('../controllers/user-controller');
const authController = require('../controllers/auth-controller');

const authenticator = require('../middlewares/auth-middlewares');

const router = express.Router();


// Auth Routes
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/me', authenticator.authenticate, userController.getMe, userController.getUser);
router.patch('/change-password', authenticator.authenticate, authController.updatePassword);


// User Routes
router.route('/')
  .get(authenticator.authenticate, userController.getUsers)
  .post(authenticator.authenticate, userController.createUser);

router.route('/:id')
  .get()
  .patch()
  .delete();



module.exports = router;