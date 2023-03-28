/**
 * @file auth.validation.js
 * @description This file contains the auth validation.
 * @author https://github.com/adorratm
 */

// Importing Joi
const joi = require('joi');

// APIError
const APIError = require('../../utils/errors');

// Class for the auth validation
class authValidation {
    // Constructor
    constructor() { }

    // Register Validation
    static register = async (req, res, next) => {
        try {
            // Validating the request body
            await joi.object({
                first_name: joi.string().trim().min(2).max(70).required().messages({
                    'string.base': `First name should be a type of 'text'`,
                    'string.empty': `First name cannot be an empty field`,
                    'string.min': `First name should have a minimum length of {#limit}`,
                    'string.max': `First name should have a maximum length of {#limit}`,
                    'string.required': `First name is a required field`
                }),
                last_name: joi.string().trim().min(2).max(70).required().messages({
                    'string.base': `Last name should be a type of 'text'`,
                    'string.empty': `Last name cannot be an empty field`,
                    'string.min': `Last name should have a minimum length of {#limit}`,
                    'string.max': `Last name should have a maximum length of {#limit}`,
                    'string.required': `Last name is a required field`
                }),
                email: joi.string().trim().email().min(2).max(255).required().messages({
                    'string.base': `Email should be a type of 'text'`,
                    'string.empty': `Email cannot be an empty field`,
                    'string.email': `Email should be a valid email`,
                    'string.min': `Email should have a minimum length of {#limit}`,
                    'string.max': `Email should have a maximum length of {#limit}`,
                    'string.required': `Email is a required field`
                }),
                password: joi.string().trim().min(6).max(32).required().messages({
                    'string.base': `Password should be a type of 'text'`,
                    'string.empty': `Password cannot be an empty field`,
                    'string.min': `Password should have a minimum length of {#limit}`,
                    'string.max': `Password should have a maximum length of {#limit}`,
                    'string.required': `Password is a required field`
                })
            }).validateAsync(req.body);
        } catch (err) {
            // Returning the error
            throw new APIError(err.message, 400);
        }
        // Calling the next middleware
        next();
    }

    // Login Validation
    static login = async (req, res, next) => {
        try {
            // Validating the request body
            await joi.object({
                email: joi.string().trim().email().min(2).max(255).required().messages({
                    'string.base': `Email should be a type of 'text'`,
                    'string.empty': `Email cannot be an empty field`,
                    'string.email': `Email should be a valid email`,
                    'string.min': `Email should have a minimum length of {#limit}`,
                    'string.max': `Email should have a maximum length of {#limit}`,
                    'string.required': `Email is a required field`
                }),
                password: joi.string().trim().min(6).max(32).required().messages({
                    'string.base': `Password should be a type of 'text'`,
                    'string.empty': `Password cannot be an empty field`,
                    'string.min': `Password should have a minimum length of {#limit}`,
                    'string.max': `Password should have a maximum length of {#limit}`,
                    'string.required': `Password is a required field`
                })
            }).validateAsync(req.body);
        } catch (err) {
            // Returning the error
            throw new APIError(err.message, 400);
        }
        // Calling the next middleware
        next();
    }
}

// Exporting the auth validation
module.exports = authValidation;