const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    foodname: {
        type: String,
        require: true
    },
    foodimg: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    hotel: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    }
}, { timestamp: true });

const Food = new mongoose.model("foodlists", FoodSchema);
module.exports = Food;