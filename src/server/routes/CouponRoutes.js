const express = require("express");
router = express.Router();
const CouponController = require('../controllers/CouponController');
const couponController = new CouponController();
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(couponController.getCoupons).post(couponController.createCoupon);
router.route('/:id').get(couponController.getCoupon);


module.exports = router;