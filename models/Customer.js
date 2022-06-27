require('dotenv').config();
const mongoose = require("mongoose");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true,
        min: 10
    },
    usertype: {
        type: String,
        require: true
    }
});

// Generate token
customerSchema.methods.generateAuthToken = async function (req, res) {
    try {
        return jwt.sign({ _id: this.id.toString() }, process.env.SECRET_KEY);
    }
    catch (error) {
        console.log("Some error to generate token " + error);
    }
}

const Customer = new mongoose.model("customers", customerSchema);

module.exports = Customer;

// mynameisrjandthisisfoodwebsite