const User = require("../models/User");
const { ObjectId } = require('mongoose').Types;

const get = async (id) => {
    const user = await User.findById(id);
    return user;
}

const update = async (id, data) => {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
}

const getWithDetails = async(id) => {
    const userId = new ObjectId(id);
    const results = await User.aggregate([
        {
            $match: { _id: userId }
        },
        {
            $lookup: {
                from: 'shipments', 
                localField: 'shipment_id',
                foreignField: '_id',
                as: 'shipment' 
            }
        }
    ]);
    const user = results && results.length ? results[0] : null;

    return user;
}

module.exports = {
    get,
    update,
    getWithDetails,
}