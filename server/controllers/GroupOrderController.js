const asyncHandler = require("express-async-handler");
const GroupOrder = require("../models/GroupOrder");

class GroupOrderController {

    //@des Get all group orders
    //@route GET /api/groupOrders
    //@access private
    getGroupOrders = asyncHandler( async (req, res) => {
        const groupOrders = await GroupOrder.find().sort({ 'updatedAt': -1 }).exec();
        res.status(200).json(groupOrders);
    });

    //@des Create new group order
    //@route POST /api/groupOrders
    //@access private
    createGroupOrder = asyncHandler( async (req, res) => {
        const { name, country } = req.body;
        let groupOrder;
        try {
            groupOrder = await GroupOrder.create({ manager_id: req.user.id, name, country });
            if(groupOrder) {
                res.status(201).json(groupOrder);
            } else {
                res.status(442).json({ message: "Create order failed!" });
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Get group order by id
    //@route GET /api/groupOrders/:id
    //@access private
    getGroupOrder = asyncHandler( async (req, res) => {
        const groupOrder = await GroupOrder.findById(req.params.id);
        try {
            if(!groupOrder) {
                res.status(404).json({ message: "Group Order not found!" });
            }
            if (groupOrder.manager_id.toString() !== req.user.id) {
                res.status(403).json({ message: "User don't have permission to update other user's order" });
            }
            res.status(200).json(groupOrder);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Update group order by id
    //@route PUT /api/groupOrders/:id
    //@access private
    updateGroupOrder = asyncHandler( async (req, res) => { 
        const groupOrder = await GroupOrder.findById(req.params.id);
        try {
            if(!groupOrder) {
                res.status(404).json({ message: "Group Order not found!" });
            } 
            if (groupOrder.manager_id.toString() !== req.user.id) {
                res.status(403).json({ message: "User don't have permission to update other user's order" });
            }
            const updatedOrder = await GroupOrder.findByIdAndUpdate( req.params.id, req.body, { new: true });
            res.status(200).json(updatedOrder);
    
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

}

module.exports = GroupOrderController;