const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        card_type: {
            type: String,
            required: [true, "Please add card type"],
        },
        card_number: {
            type: Number,
            required: [true, "Please add card number"],
        },
        bank_name: {
            type: String,
            required: [true, "Please add bank name"],
        }, 
        bill_address_1: {
            type: String,
            required: [true, "Please add bill address 1"],
        },
        bill_address_2: {
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

module.exports = mongoose.model("Payment", paymentSchema);