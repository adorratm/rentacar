/**
 * @file auth.controller.js
 * @description This file contains the auth controller.
 * @author https://github.com/adorratm
 */

// Importing the user model
const user = require('../models/user.model');

// Importing bcrypt
const bcrypt = require('bcrypt');

// Importing the APIError
const APIError = require('../utils/errors');

// Importing the Response
const Response = require('../utils/response');

// Importing the auth middleware
const { createToken } = require('../middlewares/auth');

// Login Method
const login = async (req, res) => {

    // Getting the email from the request body
    const { email, password } = req.body;

    // Checking if the user exists
    const userCheck = await user.findOne({ email });

    // If the user doesn't exist, throw an error
    if (!userCheck) {
        throw new APIError("User doesn't exist.", 400);
    }

    // Checking if the password is correct
    const passwordCheck = await bcrypt.compare(password, userCheck.password);

    // If the password is incorrect, throw an error
    if (!passwordCheck) {
        throw new APIError("Password is incorrect.", 400);
    }

    // Creating the token
    createToken(userCheck, res);
}

// Register Method
const register = async (req, res) => {

    // Getting the email from the request body
    const { email } = req.body;

    // Checking if the user already exists
    const userCheck = await user.findOne({ email });

    // If the user already exists, throw an error
    if (userCheck) {
        throw new APIError("User already exists.", 400);
    }

    // Hashing the password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // Creating the new user
    const newUser = new user(req.body);

    // Saving the new user
    await newUser.save().then((data) => {
        // Returning the response
        return new Response(data, "User created successfully.").created(res);
    }).catch((err) => {
        // Returning the error
        throw new APIError("An error occured while creating the user.", 400);
    });
}

// Exporting the methods
module.exports = { login, register }