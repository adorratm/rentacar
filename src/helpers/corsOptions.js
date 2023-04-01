/**
 * @file corsOptions.js
 * @description This file is responsible for the cors options.
 * @author https://github.com/adorratm
 */

// This file is used to configure the CORS options for the server
const whiteList = ['http://localhost:3000'];

// Exporting the cors options
const corsOptions = (req, callback) => {
    // Setting the cors options
    let corsOptions;

    // Checking if the origin is in the white list
    if (whiteList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true
        }
    } else {
        corsOptions = {
            origin: false
        }
    }

    // Calling the callback
    callback(null, corsOptions);
}

// Exporting the module
module.exports = corsOptions;