require('dotenv').config();
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

const auth = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.headers.token;
        if (!token) return res.status(400).json('Authenticate with valid user');

        // Verify token with secret key and get user details from token because token also have an user id
        const veri = jwt.verify(token, process.env.SECRET_KEY);
        req.token = token;
        req.userId = veri._id;
        next();
    }
    catch (error) {
        console.log("Some error to auth " + error);
        return res.status(400).send("Some error to auth " + error);
    }
}

module.exports = auth;