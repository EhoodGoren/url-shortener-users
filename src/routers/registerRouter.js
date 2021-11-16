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
    const { username, email, password } = req.body;
    User.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    .then(userObj => {
        if (userObj) {
            const takenMessage = handleExistingUser(userObj, username, email);
            return next({ status: 400, message: takenMessage});
        }
            
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
    if(userObj.username === username)
        return 'Username is already in use. Try using another.';
    if(userObj.email === email)
        return 'Email is already in use. Try using another.';
}


module.exports = router;
