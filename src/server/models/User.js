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
            required: function() { return !this.google_login; },
        },
        role: {
            type: Number,
            required: false,
        }, 
        google_login: {
            type: Boolean,
            default: false,
        }
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);