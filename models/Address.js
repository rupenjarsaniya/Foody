const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    house: {
        type: String,
        require: true
    },
    societyname: {
        type: String,
        require: true
    },
    landmark: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    pincode: {
        type: String,
        require: true
    },
    place: {
        type: String,
        require: true
    }
});

const Address = new mongoose.model("addresses", addressSchema);

module.exports = Address;