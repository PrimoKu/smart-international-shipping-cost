const express = require("express");
router = express.Router();
const CouponController = require('../controllers/CouponController');
const couponController = new CouponController();
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(couponController.getCoupons).post(requireAuth, couponController.createCoupon);
router.route('/:id').get(couponController.getCoupon).put(couponController.updateCoupon);


module.exports = router;