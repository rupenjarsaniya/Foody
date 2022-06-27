const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    orderId: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    food: {
        type: Object,
        require: true
    },
    deliveryaddress: {
        type: String,
        require: true
    },
    subtotal: {
        type: Number,
        require: true
    },
    totalamount: {
        type: Number,
        require: true
    },
    coupenapplied: {
        type: String,
        default: ""
    },
    discount: {
        type: Number,
        default: ""
    },
    deliverycharge: {
        type: Number,
        default: ""
    }
}, { timestamps: true });

const Orders = new mongoose.model("orders", orderSchema);

module.exports = Orders;