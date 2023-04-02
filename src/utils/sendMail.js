/**
 * @file sendMail.js
 * @description This file contains the function to send email
 * @author https://github.com/adorratm
 */

// Importing the nodemailer module
const nodemailer = require('nodemailer');

// Defining the function to send email
const sendEmail = async (mailOptions) => {
    // Creating a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Sending the email
    await transporter.sendMail(mailOptions, (error, info) => {
        // Checking for errors
        if (error) {
            console.log(error);
        } 
        return true;
    });
}

// Exporting the function
module.exports = sendEmail;