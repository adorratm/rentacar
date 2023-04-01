/**
 * @file index.js
 * @description This file is responsible for the routes.
 * @author https://github.com/adorratm
 */

// Importing the express router
const router = require('express').Router();

// Importing the multer
const multer = require('multer');

// Importing the auth routes
const auth = require('./auth.routes');

// Importing the upload middleware
const upload = require('../middlewares/lib/upload');
const APIError = require('../utils/errors');
const Response = require('../utils/response');

// Importing the path
const path = require('path');

// Importing the sharp
const sharp = require('sharp');

// Importing the fs
const fs = require('fs');

// Using the auth routes
router.use(auth);

// Creating the upload route
router.post('/upload', async (req, res) => {
    // Uploading the file
    upload(req, res, async (err) => {
        // Checking for multer errors
        if (err instanceof multer.MulterError) {
            // Sending the error
            throw new APIError(err.message, 400);
        }

        // Checking for errors
        if (err) {
            // Sending the error
            throw new APIError(err.message, 400);
        }

        // Getting the root directory
        const rootDir = path.join(path.dirname(require.main.filename), '/public/uploads');

        // Converting the images to webp
        req.files.forEach((file, i) => {
            // Converting the image to webp
            sharp(file.path).webp({ quality: 70 }).toFile(rootDir + '/' + file.filename.split('.')[0] + '.webp').then(() => {
                // Deleting the original image
                fs.unlinkSync(file.path);
            })
            // Adding the webp image to the saved images
            req.savedImages[i] = file.filename.split('.')[0] + '.webp';
        })

        // Sending the response
        return new Response(req.savedImages, "Image upload successfully.").success(res);
    });
});

// Exporting the routes
module.exports = router;