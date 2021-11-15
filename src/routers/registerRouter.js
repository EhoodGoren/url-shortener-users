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
    const { username, email, password } = req.body;
    User.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    .then(userObj => {
        if (userObj) handleExistingUser(userObj, username, email);
        console.log('check exit');
        // else
        User.create({
            username,
            email,
            password
        })
        .then(() => {
            res.redirect('/login');
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/register.html'));
})


function handleExistingUser(userObj, username, email){
    switch (userObj) {
        case userObj.username === username:
            return res.status(400).send('Username is already in use. Try using another');
        case userObj.email === email:
            return res.status(400).send('Email is already in use. Try using another');
    }
}


module.exports = router;
