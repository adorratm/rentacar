/**
 * @file errors.js
 * @description This file is responsible for the APIError class.
 * @author https://github.com/adorratm
 */

// Creating the APIError class
class APIError extends Error {
    // Creating the constructor
    constructor(message, statusCode) {
        // Calling the super constructor
        super(message);
        // Setting the status code
        this.statusCode = statusCode || 400;
    }
}

// Exporting the class
module.exports = APIError;