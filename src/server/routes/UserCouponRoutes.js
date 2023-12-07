const express = require("express");
router = express.Router();
const UserCouponController = require('../controllers/UserCouponController');
const userCouponController = new UserCouponController();
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(requireAuth, userCouponController.getUserCoupons).post(requireAuth, userCouponController.createUserCoupon);


module.exports = router;