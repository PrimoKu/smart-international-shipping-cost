const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please add user name"],
        },
        email: {
            type: String,
            required: [true, "Please add email address"],
            unique: [true, "Email address already taken"],
        },
        password: {
            type: String,
            required: [true, "Please add user password"],
        },
        shipment_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Shipment",
        },
        payment_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "Payment",
        },
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);