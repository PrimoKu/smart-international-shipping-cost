const express = require("express");
router = express.Router();
const NotificationController = require("../controllers/NotificationController");
const notificationController = new NotificationController();
// const { OrderCreateValidator, OrderUpdateValidator } = require('../middlewares/Validators');
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(requireAuth, notificationController.getNotifications).post(requireAuth, notificationController.createNotification);
// router.route('/:id').get(requireAuth, orderController.getOrder).put(requireAuth, OrderUpdateValidator, orderController.updateOrder);

module.exports = router;