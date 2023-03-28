require("express-async-errors");
const dotenv = require('dotenv');
dotenv.config();
require('./src/db/dbConnection');
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const router = require('./src/routers');
const errorHandlerMiddleware = require('./src/middlewares/errorHandler');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);

// Error Handler
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});