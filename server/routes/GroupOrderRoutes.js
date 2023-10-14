const express = require("express");
router = express.Router();
const GroupOrderController = require('../controllers/GroupOrderController');
const groupOrderController = new GroupOrderController();
// const { OrderCreateValidator, OrderUpdateValidator } = require('../middlewares/Validators');
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(groupOrderController.getGroupOrders).post(requireAuth, groupOrderController.createGroupOrder);
router.route('/:id').get(requireAuth, groupOrderController.getGroupOrder).put(requireAuth, groupOrderController.updateGroupOrder);

module.exports = router;