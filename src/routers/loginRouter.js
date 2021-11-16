require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./../models/user')
const router = express.Router();

const secret = process.env.SECRET;

mongoose.connect(process.env.DATABASE,() => {
    console.log('DB connected');
})

router.post('/', (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email, password })
    .then(user => {
        if(!user){
            return next({ status: 400, message: 'Email or password are wrong. Try again.' });
        }

        const userToken = generateToken(user.username);
        res.cookie('token', userToken, { expires: new Date(Date.now() + 3600000) });

        //res.redirect('/');
        res.send('success');
    })
    .catch(error => console.log(error));
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
})


function generateToken(user){
    return jwt.sign(user, secret);
}

module.exports = router;

