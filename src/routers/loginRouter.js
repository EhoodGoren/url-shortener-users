require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./../models/user')
const router = express.Router();

mongoose.connect(process.env.DATABASE,() => {
    console.log('DB connected');
})

router.post('/', (req, res) => {
    const { email, password } = req.body;
    User.find({ email, password })
    .then(user => {
        console.log(user);
    })
    .catch(error => console.log(error));
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
})

module.exports = router;

