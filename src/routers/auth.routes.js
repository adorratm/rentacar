/**
 * @file auth.routes.js
 * @description This file is responsible for the auth routes.
 * @author https://github.com/adorratm
 */

// Importing the express router
const router = require('express').Router();

// Importing the auth controller
const { login, register } = require('../controllers/auth.controller');

// Importing the auth validation
const authValidation = require('../middlewares/validations/auth.validation');

// Creating the routes

// Login
router.post('/login', authValidation.login, login);

// Register
router.post('/register', authValidation.register, register);

// Exporting the routes
module.exports = router;