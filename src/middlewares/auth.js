/**
 * @file auth.js
 * @description This file contains the auth middleware.
 * @author https://github.com/adorratm
 */

// Importing the jwt
const jwt = require('jsonwebtoken');

// Importing the user model
const user = require('../models/user.model');

// Importing the APIError
const APIError = require('../utils/errors');

// Creating the token
const createToken = async (user, res) => {

    // Creating the payload
    const payload = {
        sub: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    };

    // Creating the token
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS512', // Algorithm used to sign the token
        expiresIn: process.env.JWT_EXPIRES_IN // 1 day
    });

    // Sending the token
    return res.status(201).send({
        success: true,
        token,
        message: 'User logged in successfully.'
    });
}

// Checking the token
const tokenCheck = async (req, res, next) => {

    // Getting the token
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];

    // Checking if the token exists
    if (!token) {
        throw new APIError('Access denied. No token provided.', 401);
    }
    // Checking if the token is valid
    await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        
        // If the token is invalid, throw an error
        if (err) {
            throw new APIError('Access denied. Api token is unauthorized.', 401);
        }

        // Getting the user info
        const userInfo = await user.findById(decoded.sub).select("_id first_name last_name email");

        // Checking if the user exists
        if (!userInfo) {
            throw new APIError('Access denied. User not found.', 401);
        }

        // Setting the user info
        req.user = userInfo;
        
        // Calling the next middleware
        next();
    });
}

// Exporting the module
module.exports = {
    createToken,
    tokenCheck
}