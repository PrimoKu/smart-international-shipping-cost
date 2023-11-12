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
                localField: '_id',
                foreignField: 'user_id',
                as: 'shipment' 
            }
        },
        {
            $unwind: {
                path: "$shipment",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'payments', 
                localField: '_id',
                foreignField: 'user_id',
                as: 'payment' 
            }
        },
        {
            $unwind: {
                path: "$payment",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);
    const user = results && results.length ? results[0] : null;

    return user;
}

const getByEmail = async (email) => {
    const user = await User.findOne({email: email});
    return user;
}

module.exports = {
    get,
    update,
    getWithDetails,
    getByEmail,
}