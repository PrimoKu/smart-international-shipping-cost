const express = require("express");
router = express.Router();
const GroupOrderController = require('../controllers/GroupOrderController');
const groupOrderController = new GroupOrderController();
const { GroupOrderCreateValidator } = require('../middlewares/Validators');
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(requireAuth, groupOrderController.getGroupOrders).post(requireAuth, GroupOrderCreateValidator, groupOrderController.createGroupOrder);
router.route('/:id').get(requireAuth, groupOrderController.getGroupOrder).put(requireAuth, groupOrderController.updateGroupOrder);

module.exports = router;