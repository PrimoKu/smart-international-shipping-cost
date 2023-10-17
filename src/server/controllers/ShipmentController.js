const asyncHandler = require("express-async-handler");
const shipmentRepo = require("../repositories/ShipmentRepository");
const userRepo = require("../repositories/UserRepository");

class ShipmentController {


    //@des Get shipment by id
    //@route GET /api/shipments/:id
    //@access private
    getShipment = asyncHandler( async (req, res) => {
        try {
            const shipment = await shipmentRepo.get(req.params.id);
            if(!shipment) {
                return res.status(404).json({ message: "Shipment not found!" });
            }
            if (shipment.user_id.toString() !== req.user.id) {
                return res.status(403).json({ message: "User don't have permission to update other user's shipment" });
            }
            res.status(200).json(shipment);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Create new shipment
    //@route POST /api/shipments
    //@access private
    createShipment = asyncHandler( async (req, res) => {
        const { firstName, lastName, address1, address2, state, city, zipCode } = req.body;
        let shipment;
        try {
            shipment = await shipmentRepo.create(req.user.id, firstName, lastName, address1, address2, state, city, zipCode);
            if(shipment) {
                let user = await userRepo.get(req.user.id);
                if(!user.shipment_id) { 
                    user = await userRepo.update(req.user.id, {shipment_id: shipment._id}); 
                }
                return res.status(201).json({Shipment: shipment, User: user});
            } else {
                return res.status(442).json({ message: "Create shipment failed!" });
            }
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Get order by id
    //@route GET /api/orders/:id
    //@access private
    getOrder = asyncHandler( async (req, res) => {
        const order = await orderRepo.get(req.params.id);
        try {
            if(!order) {
                return res.status(404).json({ message: "Order not found!" });
            }
            if (order.user_id.toString() !== req.user.id) {
                return res.status(403).json({ message: "User don't have permission to update other user's order" });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Update order by id
    //@route PUT /api/orders/:id
    //@access private
    updateOrder = asyncHandler( async (req, res) => { 
        const order = await orderRepo.get(req.params.id);
        try {
            if(!order) {
                return res.status(404).json({ message: "Order not found!" });
            } 
            if (order.user_id.toString() !== req.user.id) {
                return res.status(403).json({ message: "User don't have permission to update other user's order" });
            }
            const updatedOrder = await orderRepo.update(req.params.id, req.body);
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

}

module.exports = ShipmentController;