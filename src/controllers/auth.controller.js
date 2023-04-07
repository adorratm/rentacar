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
const { createToken, createTemporaryToken, decodedTemporaryToken } = require('../middlewares/auth');

// Importing the crypto module
const crypto = require("crypto");

// Importing the sendMail function
const sendEmail = require('../utils/sendMail');
const moment = require('moment/moment');

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

// Getting the user
const me = async (req, res) => {
    return new Response(req.user).success(res);
}

// Forgot Password Method
const forgotPassword = async (req, res) => {
    // Getting the email from the request body
    const { email } = req.body;

    // Checking if the user exists
    const userCheck = await user.findOne({ email }).select("first_name last_name email");

    // If the user doesn't exist, throw an error
    if (!userCheck) {
        throw new APIError("User doesn't exist.", 400);
    }

    // Creating the reset code
    const resetCode = crypto.randomBytes(3).toString("hex");

    // Creating the reset time
    const resetTime = moment(new Date()).add(15, "minute").format("YYYY-MM-DD HH:mm:ss");

    // Sending the email
    await sendEmail({
        from: process.env.EMAIL_USER,
        to: userCheck.email,
        subject: "Password Reset",
        html: `Your password reset code is <b>${resetCode}</b>`,
    })

    // Updating the user
    await user.updateOne({ email }, { reset: { code: resetCode, time: resetTime } });

    // Returning the response
    return new Response(true, "Password reset code sent successfully.").success(res);
}

// Reset Code Check Method
const resetCodeCheck = async (req, res) => {
    // Getting the email and code from the request body
    const { email, code } = req.body;

    // Checking if the user exists
    const userCheck = await user.findOne({ email }).select("_id first_name last_name email reset");

    // If the user doesn't exist, throw an error
    if (!userCheck) {
        throw new APIError("User doesn't exist.", 400);
    }

    // Checking if the code is correct
    if (userCheck.reset.code !== code) {
        throw new APIError("Code is incorrect.", 400);
    }

    // Checking if the code is expired
    if (moment(new Date()).isAfter(userCheck.reset.time)) {
        throw new APIError("Code is expired.", 400);
    }

    // Creating the token
    const temporaryToken = await createTemporaryToken(userCheck._id, userCheck.email);

    // Returning the response
    return new Response({ temporaryToken }, "Code is correct.").success(res);
}

// Reset Password Method
const resetPassword = async (req, res) => {
    // Getting the password and temporaryToken from the request body
    const { password, temporaryToken } = req.body;

    // Checking if the code is correct
    const decodedToken = await decodedTemporaryToken(temporaryToken);

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Updating the user
    await user.findByIdAndUpdate({ _id: decodedToken._id }, { password: hashedPassword, reset: { code: null, time: null } });

    // Returning the response
    return new Response(decodedToken, "Password reset successfully.").success(res);
}

// Exporting the methods
module.exports = { login, register, me, forgotPassword, resetCodeCheck, resetPassword }