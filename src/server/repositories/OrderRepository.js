const Order = require("../models/Order");
const GroupOrder = require("../models/GroupOrder");


const getAll = async (user_id) => {
    const orders = await Order.find({user_id: user_id}).sort({ 'updatedAt': -1 }).exec();
    return orders;
}

const create = async (user_id, groupOrder_id, name, weight, price) => {
    const order = await Order.create({ user_id, groupOrder_id, name, weight, price });
    return order;
}

const get = async (id) => {
    const order = await Order.findById(id);
    return order;
}

const getByGroupId = async (groupOrder_id) => {
    const order = await Order.find({groupOrder_id: groupOrder_id});
    return order;
}

const update = async (id, data) => {
    const order = await Order.findByIdAndUpdate(id, data, { new: true });
    return order;
}

module.exports = {
    getAll,
    create,
    get,
    update,
    getByGroupId
}