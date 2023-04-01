/**
 * @file app.js
 * @description This file contains the main app.
 * @author https://github.com/adorratm
 */

// Express Async Errors is a middleware that wraps the route handlers and makes sure any errors they throw are passed to the express error handler.
require("express-async-errors");

// Express
const express = require('express');

// Express App
const app = express();

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require('dotenv').config();

// DB Connection 
require('./src/db/dbConnection');

// Port
const port = process.env.PORT || 5000;

// Routers
const router = require('./src/routers');

// Error Handler
const errorHandlerMiddleware = require('./src/middlewares/errorHandler');

// Cors
const cors = require('cors');

// Cors Options
const corsOptions = require('./src/helpers/corsOptions');

// Express Mongo Sanitize
const mongoSanitize = require('express-mongo-sanitize');

// Helmet
const helmet = require('helmet');

// Hpp
const hpp = require('hpp');



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(mongoSanitize({
    replaceWith: '_'
}));

app.use(helmet());
app.use(hpp());

// Routes
app.use("/api", router);

// Error Handler Middleware
app.use(errorHandlerMiddleware)

// Server Start
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});