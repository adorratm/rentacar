/**
 * @file app.js
 * @description This file contains the main app.
 * @author https://github.com/adorratm
 */

// Express Async Errors is a middleware that wraps the route handlers and makes sure any errors they throw are passed to the express error handler.
require("express-async-errors");

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
const dotenv = require('dotenv');
dotenv.config();

// DB Connection 
require('./src/db/dbConnection');

// Cors
const cors = require('cors');

// Cors Options
const corsOptions = require('./src/helpers/corsOptions');

// Express
const express = require('express');

// Port
const port = process.env.PORT || 5000;

// Express App
const app = express();

// Routers
const router = require('./src/routers');

// Error Handler
const errorHandlerMiddleware = require('./src/middlewares/errorHandler');

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

// Error Handler Middleware
app.use(errorHandlerMiddleware)

// Server Start
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});