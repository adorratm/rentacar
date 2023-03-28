/**
 * @file auth.js
 * @description This file contains the auth middleware.
 * @author https://github.com/adorratm
 */

// Importing the jwt
const jwt = require('jsonwebtoken');

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

// Exporting the module
module.exports = {
    createToken
}