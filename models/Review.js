const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    msg: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        default: 0
    },
    reviewtime: {
        type: Date,
        default: Date.now
    }
});

const Review = new mongoose.model("reviews", reviewSchema);

module.exports = Review;