const asyncHandler = require("express-async-handler");
const GroupOrder = require("../models/GroupOrder");
const groupOrderRepo = require("../repositories/GroupOrderRepository");
const { OrderStatus, OrderStatusList } = require("../enums/OrderStatusEnums");

class GroupOrderController {

    //@des Get all group orders
    //@route GET /api/groupOrders
    //@access private
    getGroupOrders = asyncHandler( async (req, res) => {
        const groupOrders = await groupOrderRepo.getAll(req.user.id); 
        res.status(200).json(groupOrders);
    });

    //@des Create new group order
    //@route POST /api/groupOrders
    //@access private
    createGroupOrder = asyncHandler( async (req, res) => {
        const { name, country } = req.body;
        let groupOrder;
        try {
            groupOrder = await groupOrderRepo.create(req.user.id, name, country);
            if(groupOrder) {
                return res.status(201).json(groupOrder);
            } else {
                return res.status(442).json({ message: "Create order failed!" });
            }
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Get group order by id
    //@route GET /api/groupOrders/:id
    //@access private
    getGroupOrder = asyncHandler( async (req, res) => {
        try {
            const groupOrder = await groupOrderRepo.getWithDetails(req.params.id);
            if(!groupOrder) {
                return res.status(404).json({ message: "Group Order not found!" });
            }
            if (!groupOrder.users.some(user => user._id.toString() === req.user.id) && groupOrder.manager[0]._id.toString() !== req.user.id) {
                return res.status(403).json({ message: "User don't have permission to update other user's order" });
            }
            res.status(200).json({
                GroupOrder: groupOrder,
                OrderStatusList: OrderStatusList
            });
        } catch (error) {
            console.error(error);
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Update group order by id
    //@route PUT /api/groupOrders/:id
    //@access private
    updateGroupOrder = asyncHandler( async (req, res) => { 
        const groupOrder = await groupOrderRepo.get(req.params.id);
        try {
            if(!groupOrder) {
                return res.status(404).json({ message: "Group Order not found!" });
            } 
            if (groupOrder.manager_id.toString() !== req.user.id) {
                return res.status(403).json({ message: "User don't have permission to update other user's order" });
            }
            const updatedGroupOrder = await groupOrderRepo.update(req.params.id, req.body);
            res.status(200).json(updatedGroupOrder);
    
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

}

module.exports = GroupOrderController;