const mongoose = require('mongoose');

const userCouponSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        coupon_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Coupon",
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

module.exports = mongoose.model("UserCoupon", userCouponSchema);