/**
 * @file dbConnection.js
 * @description This file is responsible for connecting to the MongoDB database.
 * @author https://github.com/adorratm
 */

// Importing the mongoose
const mongoose = require("mongoose");

// Connecting to the MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});