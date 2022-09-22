const express = require('express');
const crypto = require('crypto');
const emailValidation = require('../middlewares/error.emailValidation');
const passwordValidation = require('../middlewares/error.passwordValidation');

const loginRoute = express();

loginRoute.post('/', emailValidation, passwordValidation, async (req, res) => {
    const { email, password } = await req.body;
    if (email && password) {
        const token = crypto.randomBytes(8).toString('hex');
        return res.status(200).json({ token });
    }
   res.status(401).json({ message: 'not ok' });
});

module.exports = loginRoute;