const asyncHandler = require("express-async-handler");
const shipmentRepo = require("../repositories/ShipmentRepository");
const userRepo = require("../repositories/UserRepository");

class ShipmentController {


    //@des Get shipment by user id
    //@route GET /api/shipments
    //@access private
    getShipment = asyncHandler( async (req, res) => {
        try {
            const shipment = await shipmentRepo.get(req.user.id);
            if(!shipment) {
                return res.status(404).json({ message: "Shipment not found!" });
            }
            res.status(200).json(shipment);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Create new shipment by user id
    //@route POST /api/shipments
    //@access private
    createShipment = asyncHandler( async (req, res) => {
        const { firstName, lastName, address1, address2, state, city, zipCode } = req.body;
        let shipment;
        try {
            shipment = await shipmentRepo.create(req.user.id, firstName, lastName, address1, address2, state, city, zipCode);
            if(shipment) {
                return res.status(201).json({Shipment: shipment, User: user});
            } else {
                return res.status(442).json({ message: "Create shipment failed!" });
            }
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Upsert shipment information
    //@route POST /api/shipments/upsert
    //@access private
    upsertShipment = asyncHandler(async (req, res) => {
        
        const { firstName, lastName, address1, address2, state, city, zipCode } = req.body;
        try {
            let shipment = await shipmentRepo.get(req.user.id);
            console.log(shipment);
            if (shipment) {
                shipment = await shipmentRepo.update(req.user.id, { firstName, lastName, address1, address2, state, city, zipCode });
            } else {
                shipment = await shipmentRepo.create(req.user.id, firstName, lastName, address1, address2, state, city, zipCode);
            }

            return res.status(200).json(shipment);

        } catch (error) {
            console.error('Error upserting shipment information:', error);
            return res.status(500).json({ message: "Server Error!" });
        }
    });
}

module.exports = ShipmentController;