const express = require("express");
router = express.Router();
const OrderController = require('../controllers/OrderController');
const orderController = new OrderController();
const { OrderCreateValidator, OrderUpdateValidator } = require('../middlewares/Validators');
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(requireAuth, orderController.getOrders).post(requireAuth, OrderCreateValidator, orderController.createOrder);
router.route('/:id').get(requireAuth, orderController.getOrder).put(requireAuth, OrderUpdateValidator, orderController.updateOrder);

router.route('/pend/:id').put(requireAuth, orderController.pendOrder);
router.route('/approve/:id').put(requireAuth, orderController.approveOrder);
router.route('/cancel/:id').put(requireAuth, orderController.cancelOrder);

module.exports = router;