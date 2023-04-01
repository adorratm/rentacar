/**
 * @file upload.js
 * @description This file contains the upload middleware.
 * @author https://github.com/adorratm
 */

// Importing the multer
const multer = require('multer');

// Importing the path
const path = require('path');

// Importing the fs
const fs = require('fs');

// File filter
const fileFilter = (req, file, cb) => {
    // Creating the allowed mimetypes array
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];

    // Checking the file mimetype
    if (!allowedMimeTypes.includes(file.mimetype)) {
        // Calling the callback
        cb(new Error("This file mimetype is not supported. Supported file mimetypes are: " + allowedMimeTypes.join(',')), false);
    }

    // Calling the callback
    cb(null, true);
}

// Creating the storage
const storage = multer.diskStorage({
    // Setting the destination
    destination: (req, file, cb) => {
        // Getting the root directory
        const rootDir = path.dirname(require.main.filename);

        // Creating the uploads directory
        fs.mkdirSync(path.join(rootDir, '/public/uploads'), { recursive: true });

        // Calling the callback
        cb(null, path.join(rootDir, '/public/uploads'));
    },
    // Setting the filename
    filename: (req, file, cb) => {
        // Getting the file extension
        const fileExtension = file.mimetype.split('/').pop();

        // Creating the saved images array
        if (!req.savedImages) req.savedImages = [];

        // Creating the unique suffix
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        // Creating the url
        let url = `image_${uniqueSuffix}.${fileExtension}`;

        // Adding the url to the saved images
        req.savedImages = [...req.savedImages, url];

        // Calling the callback
        cb(null, url);
    }
});

// Creating the upload middleware
const upload = multer({ storage, fileFilter }).array("images");

// Exporting the upload middleware
module.exports = upload;