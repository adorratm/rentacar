const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');

const login = async (req, res) => {
    console.log(req.body);

    return res.send(req.body);
}

const register = async (req, res) => {

    const { email } = req.body;

    const userCheck = await user.findOne({ email });

    if (userCheck) {
        throw new APIError("User already exists", 400);
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    console.log("hash şifre: ", req.body.password);

    try {
        const newUser = new user(req.body);
        await newUser.save().then((response) => {
            return res.status(201).send({ success: true, message: "User Created Successfully", data: response });
        }).catch((err) => {
            console.log(err);
        });
    } catch (err) {
        console.log(err);
    }
}


module.exports = { login, register }