const mongoose = require("mongoose");

const forgotSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        index: {
            expires: 300
        }
    }
}, { timestamps: true });

const Forgot = new mongoose.model("forgot", forgotSchema);

module.exports = Forgot;