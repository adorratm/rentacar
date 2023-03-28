const mongoose = require("mongoose");

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
}, { collection: "users", timestamps: true });

const user = mongoose.model("users", userSchema);

module.exports = user;