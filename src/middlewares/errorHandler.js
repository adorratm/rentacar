/**
 * @file errorHandler.js
 * @description This file is responsible for handling the errors.
 * @author https://github.com/adorratm
 */

// Importing the APIError
const APIError = require('../utils/errors');

// Error Handler Middleware
const errorHandlerMiddleware = (err, req, res, next) => {
    // If the error is an instance of APIError, send it as the response.
    if (err instanceof APIError) {
        return res.status(err.statusCode || 400).send({ success: false, message: err.message });
    }

    

    // If the error is not an instance of APIError, convert it.
    return res.status(500).send({ success: false, message: err.message });
}

// Exporting the middleware
module.exports = errorHandlerMiddleware;