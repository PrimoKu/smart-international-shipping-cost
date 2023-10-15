const asyncHandler = require("express-async-handler");
const orderRepo = require("../repositories/OrderRepository");
const groupOrderRepo = require("../repositories/GroupOrderRepository");
const { OrderStatus } = require("../enums/OrderStatusEnums");

class OrderController {

    //@des Get all orders
    //@route GET /api/orders
    //@access private
    getOrders = asyncHandler( async (req, res) => {
        const user_id = req.user.id;
        const orders = await orderRepo.getAll(user_id);
        res.status(200).json(orders);
    });

    //@des Create new order
    //@route POST /api/orders
    //@access private
    createOrder = asyncHandler( async (req, res) => {
        const { name, weight, price, groupOrder_id } = req.body;
        let order;
        try {
            order = await orderRepo.create(req.user.id, groupOrder_id, name, weight, price);
            if(order) {
                const groupOrder = await groupOrderRepo.update(groupOrder_id, { $push: { order_ids: order._id }});
                res.status(201).json({Order: order, GroupOrder: groupOrder});
            } else {
                res.status(442).json({ message: "Create order failed!" });
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
                res.status(404).json({ message: "Order not found!" });
            }
            if (order.user_id.toString() !== req.user.id) {
                res.status(403).json({ message: "User don't have permission to update other user's order" });
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
                res.status(404).json({ message: "Order not found!" });
            } 
            if (order.user_id.toString() !== req.user.id) {
                res.status(403).json({ message: "User don't have permission to update other user's order" });
            }
            const updatedOrder = await orderRepo.update(req.params.id, req.body);
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@des Pend order by id
    //@route PUT /api/orders/pend/:id
    //@access private    
    pendOrder = asyncHandler ( async (req, res) => {
        const order = await orderRepo.get(req.params.id);
        try {
            if(!order) {
                res.status(404).json({ message: "Order not found!" });
            } 
            
            // if (order.user_id.toString() !== req.user.id) {
            //     res.status(403).json({ message: "User don't have permission to update other user's order" });
            // }
            const updatedOrder = await orderRepo.update(req.params.id, {status: OrderStatus.PENDING});
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    })

    //@des Approve order by id
    //@route PUT /api/orders/approve/:id
    //@access private    
    approveOrder = asyncHandler ( async (req, res) => {
        const order = await orderRepo.get(req.params.id);
        try {
            if(!order) {
                res.status(404).json({ message: "Order not found!" });
            } 
            
            // if (order.user_id.toString() !== req.user.id) {
            //     res.status(403).json({ message: "User don't have permission to update other user's order" });
            // }
            const updatedOrder = await orderRepo.update(req.params.id, {status: OrderStatus.APPROVED});
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    })

    //@des Cancel order by id
    //@route PUT /api/orders/cancel/:id
    //@access private    
    cancelOrder = asyncHandler ( async (req, res) => {
        const order = await orderRepo.get(req.params.id);
        try {
            if(!order) {
                res.status(404).json({ message: "Order not found!" });
            } 
            
            // if (order.user_id.toString() !== req.user.id) {
            //     res.status(403).json({ message: "User don't have permission to update other user's order" });
            // }
            const updatedOrder = await orderRepo.update(req.params.id, {status: OrderStatus.CANCELED});
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    })
}

module.exports = OrderController;