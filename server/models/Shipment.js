const mongoose = require('mongoose');

const shipmentSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        first_name: {
            type: String,
            required: [true, "Please add first name"],
        },
        last_name: {
            type: String,
            required: [true, "Please add last name"],
        },
        address_1: {
            type: String,
            required: [true, "Please add address 1"],
        }, 
        address_2: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: [true, "Please add state"],
        },
        city: {
            type: String,
            required: [true, "Please add city"],
        },
        zip_code: {
            type: String,
            required: [true, "Please add zip code"],
        }
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Shipment", shipmentSchema);