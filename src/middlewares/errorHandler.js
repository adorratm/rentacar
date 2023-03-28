const APIError = require('../utils/errors');

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof APIError) {
        return res.status(err.statusCode || 400).send({ success: false, message: err.message });
    }

    return res.status(500).send({ success: false, message: err.message });
}

module.exports = errorHandlerMiddleware;