const express = require("express");
router = express.Router();
const GroupOrderController = require('../controllers/GroupOrderController');
const groupOrderController = new GroupOrderController();
// const { OrderCreateValidator, OrderUpdateValidator } = require('../middlewares/Validators');
// const { requireAuth, checkUser } = require('../middlewares/AuthMiddleware');
  
// router.route('/').get(groupOrderController.getOrders).post(OrderCreateValidator, orderController.createOrder);
// router.route('/:id').get(orderController.getOrder).put(OrderUpdateValidator, orderController.updateOrder);

module.exports = router;