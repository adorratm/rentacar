/**
 * @file index.js
 * @description This file is responsible for the routes.
 * @author https://github.com/adorratm
 */

// Importing the express router
const router = require('express').Router();

// Importing the auth routes
const auth = require('./auth.routes');

// Using the auth routes
router.use(auth);

// Exporting the routes
module.exports = router;