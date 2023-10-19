const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        message: {
            type: String,
            required: [true, "Please add notification message"],
        },
        link: {
            type: String,
            required: [true, "Please add notification link"],
        },
        isRead: { 
            type: Boolean, 
            default: false 
        }, 
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Notification", notificationSchema);