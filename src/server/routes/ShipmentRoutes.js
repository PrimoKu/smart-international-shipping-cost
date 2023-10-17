const express = require("express");
router = express.Router();
const ShipmentController = require('../controllers/ShipmentController');
const shipmentController = new ShipmentController();
const { ShipmentCreateValidator } = require('../middlewares/Validators');
const { requireAuth } = require('../middlewares/AuthMiddleware');
  
router.route('/').post(requireAuth, ShipmentCreateValidator, shipmentController.createShipment);
router.route('/:id').get(requireAuth, shipmentController.getShipment);

module.exports = router;