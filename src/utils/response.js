/**
 * @file response.js
 * @description This file is responsible for the Response class.
 * @author https://github.com/adorratm
 */

// Creating the Response class
class Response {
    // Creating the constructor
    constructor(data = null, message = null) {
        // Setting the data
        this.data = data;
        // Setting the message
        this.message = message;
    }

    // Success method
    success(res) {
        // Returning the response
        return res.status(200).send({ success: true, data: this.data, message: this.message ?? "Successfully." });
    }

    // Created method
    created(res) {
        // Returning the response
        return res.status(201).send({ success: true, data: this.data, message: this.message ?? "Created successfully." });
    }

    // Error 400 method
    error400(res) {
        // Returning the response
        return res.status(400).send({ success: false, data: this.data, message: this.message ?? "Bad request." });
    }

    // Error 401 method
    error401(res) {
        // Returning the response
        return res.status(401).send({ success: false, data: this.data, message: this.message ?? "Unauthorized." });
    }

    // Error 403 method
    error403(res) {
        // Returning the response
        return res.status(403).send({ success: false, data: this.data, message: this.message ?? "Forbidden access requested to resource or operation is not allowed." });
    }

    // Error 404 method
    error404(res) {
        // Returning the response
        return res.status(404).send({ success: false, data: this.data, message: this.message ?? "Not found." });
    }

    // Error 429 method
    error429(res) {
        // Returning the response
        return res.status(429).send({ success: false, data: this.data, message: this.message ?? "Too many requests." });
    }

    // Error 500 method
    error500(res) {
        // Returning the response
        return res.status(500).send({ success: false, data: this.data, message: this.message ?? "Internal server error" });
    }
}

// Exporting the Response class
module.exports = Response;