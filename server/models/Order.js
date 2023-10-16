const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        groupOrder_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "GroupOrder",
        },
        name: {
            type: String,
            required: [true, "Please add order name"],
        },
        weight: {
            type: Number,
            min: 1,
            required: [true, "Please add order weight"],
        },
        price: {
            type: Number,
            min: 1,
            required: [true, "Please add order price"],
        }, 
        status: {
            type: Number,
            default: 0,
        }
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);