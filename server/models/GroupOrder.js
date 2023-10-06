const mongoose = require('mongoose');

const groupOrderSchema = mongoose.Schema({
        manager_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Please add group order name"],
        },
        deadline: {
            type: Date,
            required: false,
        },
        order_ids: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            }
        ]
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("GroupOrder", groupOrderSchema);