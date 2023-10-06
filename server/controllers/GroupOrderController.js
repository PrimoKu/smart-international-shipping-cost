const asyncHandler = require("express-async-handler");
const GroupOrder = require("../models/GroupOrder");

class GroupOrderController {

    //@des Get all orders
    //@route GET /api/groupOrders
    //@access private
    getGroupOrders = asyncHandler( async (req, res) => {
        const groupOrders = await GroupOrder.find().sort({ 'updatedAt': -1 }).exec();
        res.status(200).json(groupOrders);
    });

    //@des Create new order
    //@route POST /api/groupOrders
    //@access private
    createGroupOrder = asyncHandler( async (req, res) => {
        const { name } = req.body;
        const user_id = req.user._id;
        let groupOrder;
        try {
            groupOrder = await GroupOrder.create({ name });
            if(order) {
                res.status(201).json(order);
            } else {
                res.status(442).json({ message: "Create order failed!" });
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            throw new Error("Server Error!");
        }
    });

}

module.exports = GroupOrderController;