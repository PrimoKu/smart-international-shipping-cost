const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

class OrderController {

    //@des Get all orders
    //@route GET /api/orders
    //@access private
    getOrders = asyncHandler( async (req, res) => {
        const orders = await Order.find({user_id: req.user.id}).sort({ 'updatedAt': -1 }).exec();
        res.status(200).json(orders);
    });

    //@des Create new order
    //@route POST /api/orders
    //@access private
    createOrder = asyncHandler( async (req, res) => {
        const { name, weight, price } = req.body;
        let order;
        try {
            order = await Order.create({ user_id: req.user.id, name, weight, price });
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

    //@des Get order by id
    //@route GET /api/orders/:id
    //@access private
    getOrder = asyncHandler( async (req, res) => {
        const order = await Order.findById(req.params.id);
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
        const order = await Order.findById(req.params.id);
        try {
            if(!order) {
                res.status(404).json({ message: "Order not found!" });
            } 
            if (order.user_id.toString() !== req.user.id) {
                res.status(403).json({ message: "User don't have permission to update other user's order" });
            }
            const updatedOrder = await Order.findByIdAndUpdate( req.params.id, req.body, { new: true });
            res.status(200).json(updatedOrder);
    
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });
}

module.exports = OrderController;