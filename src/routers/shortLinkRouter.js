require('dotenv').config();
const express = require("express");
const { nanoid } = require("nanoid");
const path = require('path');
const mongoose = require('mongoose');
const router  = express.Router();
const ShortLink = require('./../models/link');
// const baseURL = 'https://my-shortify.herokuapp.com/';
const baseURL = 'http://localhost:8080/';

mongoose.connect(process.env.DATABASE,() => {
    console.log('DB connected');
})

router.post('/shorten', (req, res) => {
    const userURL = req.body.url;
    //  existing URL Validator
    findFreeKey()
    .then(shortURLKey => {
        const longURL = httpsIncluded(userURL);
        ShortLink.create({
            'shortURL-key':shortURLKey,
            longURL
        })
        .then(() => {
            const fullShortURL = `${baseURL}${shortURLKey}`;
            res.send(fullShortURL);
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
})

router.get('/:shortURL', (req, res, next) => {
    const shortURL = req.params.shortURL;
    ShortLink.findOne({'shortURL-key': shortURL})
    .then(shortLinkObj => {
        if(!shortLinkObj){
            return next( {status: 404, message: "Short link doesn't exist"} );
        }
        else{
            // Increase click count
            res.redirect(shortLinkObj.longURL);
        }
    })
    .catch(error => console.log(error));
})

router.get('/', (req, res) => {
    // res.sendFile('index.html', '/views');
    res.sendFile(path.join(__dirname, '../../views/index.html'));
})

/**
 * 
 * @param {String} url - A url with or without 'https://' at the start
 * @returns {String} - A url with 'https://' at the start
 */
function httpsIncluded(url){
    const httpsStart = 'https://';
    const urlBeginning = url.slice(0, 8);
    return urlBeginning === httpsStart ? url : `${httpsStart}${url}`;
}

/**
 * Generates random short keys, until finding one that isn't taken yet.
 * @returns {String} Generated key.
 */
function findFreeKey(){
    let shortURL_key = nanoid(6);
    return ShortLink.findOne({ 'shortURL-key': shortURL_key })
    .then(shortLinkObj => {
        return shortLinkObj ? findFreeKey() : shortURL_key;
    })
    .catch(() => console.log('No data'));
}

module.exports = router;
