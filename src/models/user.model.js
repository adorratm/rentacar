/**
 * @file user.model.js
 * @description This file is responsible for the user model.
 * @author https://github.com/adorratm
 */

// Importing the mongoose
const mongoose = require("mongoose");

// Creating the user schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        min_length: 2,
        max_length: 70,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        min_length: 2,
        max_length: 70,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    reset: {
        code: {
            type: String,
            default: null,
            trim: true
        },
        time: {
            type: Date,
            default: null,
            trim: true
        }
    }
}, { collection: "users", timestamps: true });

// Creating the user model
const user = mongoose.model("users", userSchema);

// Exporting the model
module.exports = user;