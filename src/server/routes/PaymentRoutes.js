const express = require("express");
router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const paymentController = new PaymentController();
const { PaymentCreateValidator } = require('../middlewares/Validators');
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(requireAuth, paymentController.getPayment).post(requireAuth, PaymentCreateValidator, paymentController.createPayment).put(requireAuth, paymentController.updatePayment);
router.route('/upsert').post(requireAuth, PaymentCreateValidator, paymentController.upsertPayment);
module.exports = router;