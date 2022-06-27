const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    name: {
        type: String,
        require: true
    },
    msg: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Review = new mongoose.model("reviews", reviewSchema);

module.exports = Review;