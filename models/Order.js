const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    food: {
        type: Array,
        require: true
    },
    deliveryaddress: {
        type: String,
        require: true
    },
    subtotal: {
        type: String,
        require: true
    },
    ordertime: {
        type: Date,
        default: Date.now
    }
});

const Orders = new mongoose.model("orders", orderSchema);

module.exports = Orders;