const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
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
        }
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);