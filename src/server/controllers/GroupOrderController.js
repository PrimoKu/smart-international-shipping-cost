const asyncHandler = require("express-async-handler");
const GroupOrder = require("../models/GroupOrder");
const Order = require("../models/Order");
const groupOrderRepo = require("../repositories/GroupOrderRepository");
const userRepo = require("../repositories/UserRepository");
const notificationRepo = require("../repositories/NotificationRepository");
const { OrderStatus, OrderStatusList } = require("../enums/OrderStatusEnums");
const { GroupOrderStatus, GroupOrderStatusList } = require("../enums/GroupOrderStatusEnums");
const { UserRole, UserRoleList } = require("../enums/UserRoleEnums");
const { sendNotificationToUser } = require("../socketManager");

class GroupOrderController {

    //@des Accept group order by shipper
    //@route PUT /api/groupOrders/accept/:id
    //@access private (Shipper Only)
    acceptGroupOrder = asyncHandler(async (req, res) => {
      console.log(req.params.id);
        const groupOrder = await groupOrderRepo.get(req.params.id);
        if (!groupOrder) {
            return res.status(404).json({ message: "Group Order not found!" });
       }
        if (req.user.role !== UserRole.SHIPPER) {
            return res.status(403).json({ message: "Only shippers can accept orders." });
        }
        if (groupOrder.status === GroupOrderStatus.SUBMITTED) {
            const updatedGroupOrder = await groupOrderRepo.update(req.params.id, { shipper_id: req.user.id, status: GroupOrderStatus.SHIPPING });
            res.status(200).json(updatedGroupOrder);
        } else {
            res.status(400).json({ message: "Order cannot be accepted at this stage." });
        }
    });
    
    //@des Complete group order by shipper
    //@route PUT /api/groupOrders/complete/:id
    //@access private (Shipper Only)
    completeGroupOrder = asyncHandler(async (req, res) => {
        const groupOrder = await groupOrderRepo.get(req.params.id);
        if (!groupOrder) {
            return res.status(404).json({ message: "Group Order not found!" });
        }
        if (req.user.role !== UserRole.SHIPPER) {
            return res.status(403).json({ message: "Only shippers can complete orders." });
        }
        if (groupOrder.status === GroupOrderStatus.SHIPPING) {
            const updatedGroupOrder = await groupOrderRepo.update(req.params.id, { status: GroupOrderStatus.DELIVERED });
            res.status(200).json(updatedGroupOrder);
        } else {
            res.status(400).json({ message: "Order cannot be completed at this stage." });
        }
    });

    
    //@des Get all group orders
    //@route GET /api/groupOrders
    //@access private
    getGroupOrders = asyncHandler(async (req, res) => {
        if (req.user.role == UserRole.SHIPPER) {
            const groupOrder = await groupOrderRepo.getAll();
            let groupOrders = groupOrder.filter(group => group.shipper_id == req.user.id || group.status === 2);
            return res.status(200).json(groupOrders);
        } else {
            const groupOrders_managed = await groupOrderRepo.getAllWithUser(req.user.id);
            const groupOrders_joined = await groupOrderRepo.getOrdersWhereUserIsNotManager(req.user.id);
            return res.status(200).json({ managed: groupOrders_managed, joined: groupOrders_joined });
        }
    });

    //@des Create new group order
    //@route POST /api/groupOrders
    //@access private
    createGroupOrder = asyncHandler(async (req, res) => {
        console.log(req.body);
        const { name, country, deadline } = req.body;
        let groupOrder;
        try {
            groupOrder = await groupOrderRepo.create(req.user.id, name, country, deadline);
            if (groupOrder) {
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
    getGroupOrder = asyncHandler(async (req, res) => {
        try {
            const groupOrder = await groupOrderRepo.getWithDetails(req.params.id);
            if (!groupOrder) {
                return res.status(404).json({ message: "Group Order not found!" });
            }
            /**if (!groupOrder.users.some(user => user._id.toString() === req.user.id) && groupOrder.manager._id.toString() !== req.user.id) {
                return res.status(403).json({ message: "User don't have permission to update other user's order" });
            }**/
            console.log(groupOrder);
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
    updateGroupOrder = asyncHandler(async (req, res) => {
        const groupOrder = await groupOrderRepo.get(req.params.id);
        try {
            if (!groupOrder) {
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

    //@des Invite user to group order
    //@route POST /api/groupOrders/invite/:id
    //@access private
    inviteToGroupOrder = asyncHandler(async (req, res) => {
        const sender = req.user;
        const groupOrder = await groupOrderRepo.get(req.params.id);
        const { userEmail } = req.body;
        let notification;
        try {
            const receiver = await userRepo.getByEmail(userEmail);
            if (!receiver) { return res.status(404).json({ message: "User not found!" }); }

            const message = `${sender.name} invited you to join the group: ${groupOrder.name} \n http://localhost:3000/admin/groupOrder/${groupOrder.id}`;
            notification = await notificationRepo.create(receiver.id, message);
            if (notification) {
                res.status(201).json({ notification });
            } else {
                return res.status(442).json({ message: "Create notification failed!" });
            }
            sendNotificationToUser(receiver.id, message);
        } catch (error) {
            console.log(error);
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Add user to group order
    //@route PUT /api/groupOrders/add/:id
    //@access private
    addToGroupOrder = asyncHandler(async (req, res) => {
        const user_id = req.user.id;
        const groupOrder = await groupOrderRepo.get(req.params.id);
        if (!groupOrder) {
            return res.status(404).json({ message: "Group Order not found!" });
        }
        try {
            const updatedGroupOrder = await groupOrderRepo.update(
                req.params.id,
                { $push: { user_ids: user_id } },
                { new: true }
            );
            res.status(200).json(updatedGroupOrder);
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
            res.status(500).json({ message: "Server Error!" });
        }
    });

    //@des Remove a joiner from a group order
    //@route PUT /api/groupOrders/:id/remove/:joinerId
    //@access private
    removeFromGroupOrder = asyncHandler(async (req, res) => {
        const groupOrder_Id = req.params.id;
        const joiner_Id = req.params.joinerId;

        try {
            const groupOrder = await groupOrderRepo.get(groupOrder_Id);

            if (!groupOrder) {
                return res.status(404).json({ message: "Group Order not found!" });
            }
            const updatedGroupOrder = await GroupOrder.updateOne( { _id: groupOrder_Id }, { $pull: { user_ids: joiner_Id } });
            const deletedOrders = await Order.deleteMany({ groupOrder_id: groupOrder_Id, user_id: joiner_Id });

            res.status(200).json({ updatedGroupOrder, deletedOrders });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error!" });
        }
    });

    //@des disband a group order
    //@route PUT /api/groupOrders/disband/:id
    //@access private
    disbandGroupOrder = asyncHandler(async (req, res) => {
        const groupOrder_Id = req.params.id;

        try {
            const groupOrder = await groupOrderRepo.get(groupOrder_Id);

            if (!groupOrder) {
                return res.status(404).json({ message: "Group Order not found!" });
            }
            const deletedOrders = await Order.deleteMany({ groupOrder_id: groupOrder_Id });
            const deletedGroupOrder = await GroupOrder.deleteMany( { _id: groupOrder_Id });
            
            res.status(200).json({ deletedOrders, deletedGroupOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error!" });
        }
    });

}

module.exports = GroupOrderController;