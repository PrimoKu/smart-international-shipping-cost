const express = require("express");
router = express.Router();
const GroupOrderController = require('../controllers/GroupOrderController');
const groupOrderController = new GroupOrderController();
const { GroupOrderCreateValidator } = require('../middlewares/Validators');
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').get(requireAuth, groupOrderController.getGroupOrders).post(requireAuth, GroupOrderCreateValidator, groupOrderController.createGroupOrder);
router.route('/:id').get(requireAuth, groupOrderController.getGroupOrder).put(requireAuth, groupOrderController.updateGroupOrder);

router.route('/invite/:id').post(requireAuth, groupOrderController.inviteToGroupOrder);
router.route('/add/:id').put(requireAuth, groupOrderController.addToGroupOrder);


//new route for shipper change the status
router.route('/accept/:id').put(requireAuth, groupOrderController.acceptGroupOrder);
router.route('/complete/:id').put(requireAuth, groupOrderController.completeGroupOrder);
module.exports = router;