/**
 * @file auth.routes.js
 * @description This file is responsible for the auth routes.
 * @author https://github.com/adorratm
 */

// Importing the express router
const router = require('express').Router();

// Importing the auth controller
const { login, register, me, forgotPassword, resetCodeCheck, resetPassword } = require('../controllers/auth.controller');

// Importing the auth validation
const authValidation = require('../middlewares/validations/auth.validation');

// Token check
const { tokenCheck } = require('../middlewares/auth');

// Creating the routes

// Login
router.post('/login', authValidation.login, login);

// Register
router.post('/register', authValidation.register, register);

// Getting the user data
router.get('/me', tokenCheck, me);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset code check
router.post('/reset-code-check', resetCodeCheck);

// Reset password
router.post('/reset-password', resetPassword);

// Exporting the routes
module.exports = router;