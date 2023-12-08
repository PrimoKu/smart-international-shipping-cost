const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please add coupon name"],
        },
        code: {
            type: String,
            required: [true, "Please add coupon code"],
            unique: true
        },
        discount: {
            type: Number,
            required: [true, "Please add coupon discount amount"],
        },
        expire_date: {
            type: Date,
            required: [true, "Please add coupon expiration date"],
        },
        used: {
            type: Boolean,
            default: false,
        }
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Coupon", couponSchema);