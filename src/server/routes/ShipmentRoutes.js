const express = require("express");
router = express.Router();
const ShipmentController = require('../controllers/ShipmentController');
const shipmentController = new ShipmentController();
const { ShipmentCreateValidator } = require('../middlewares/Validators');
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').post(requireAuth, ShipmentCreateValidator, shipmentController.createShipment).get(requireAuth, shipmentController.getShipment);
router.route('/upsert').post(requireAuth, ShipmentCreateValidator, shipmentController.upsertShipment);


module.exports = router;