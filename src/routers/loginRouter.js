require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./../models/user')
const router = express.Router();

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
        res.send(`Welcome ${user.username}`);
        //logined. start session.
    })
    .catch(error => console.log(error));
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
})

module.exports = router;

