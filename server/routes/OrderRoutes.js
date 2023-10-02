const express = require("express");
router = express.Router();
const OrderController = require('../controllers/OrderController');
const orderController = new OrderController();
const { OrderCreateValidator, OrderUpdateValidator } = require('../middlewares/Validators');
// const { requireAuth, checkUser } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(orderController.getOrders).post(OrderCreateValidator, orderController.createOrder);
router.route('/:id').get(orderController.getOrder).put(OrderUpdateValidator, orderController.updateOrder);

module.exports = router;