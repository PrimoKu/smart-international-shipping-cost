const Notification = require("../models/Notification");

const getAll = async (user_id) => {
    const notifications = await Notification.find({user_id: user_id}).sort({'createdAt': -1}).exec();
    return notifications;
}

const create = async (user_id, message) => {
    const notification = await Notification.create({ user_id, message });
    return notification;
}

const get = async (id) => {
    const notification = await Notification.findById(id);
    return notification;
}

// const update = async (id, data) => {
//     const order = await Order.findByIdAndUpdate(id, data, { new: true });
//     return order;
// }

module.exports = {
    getAll,
    create,
    get,
    // update,
}