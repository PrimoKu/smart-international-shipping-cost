const express = require("express");
router = express.Router();
const UserController = require('../controllers/UserController');
const userController = new UserController();
const { UserRegisterValidator, UserUpdateValidator } = require('../middlewares/Validators');
const { requireAuth, checkUser } = require('../middlewares/AuthMiddleware');

router.route('/register').post(UserRegisterValidator, userController.registerUser);
router.route('/login').post(userController.loginUser);
router.route('/logout').get(userController.logoutUser);
router.route('/current').get(requireAuth, userController.currentUser);

// router.route('/:id').put(checkUser, UserUpdateValidator, userController.updateUser);

module.exports = router;