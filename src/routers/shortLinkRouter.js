require('dotenv').config();
const express = require("express");
const { nanoid } = require("nanoid");
const path = require('path');
const mongoose = require('mongoose');
const router  = express.Router();
const ShortLink = require('./../models/link');
// const { linksDb } = require('../../app');
// const baseURL = 'https://my-shortify.herokuapp.com/';
const baseURL = 'http://localhost:8080/';
// let linksDb;

// function setRouterDB(db){
    //     linksDb = db;
    // }

mongoose.connect(process.env.DATABASE,() => {
    console.log('DB connected');
})
// next({ status: 400, message: "Can't save"}) );
router.post('/shorten', (req, res) => {
    const userURL = req.body.url;
    //  existing URL Validator
    findFreeKey()
    .then(shortURLKey => {
        const longURL = httpsIncluded(userURL);
        const shortURL = `${baseURL}${shortURLKey}`;
        ShortLink.create({
            shortURL,
            longURL
        })
        .then(() => {
            res.send(shortURL);
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
    // while(linksDb.getValue(shortURLKey)){
    //     shortURLKey = nanoid(6);
    // }
    // linksDb.store(shortURLKey, { longURL, timesClicked: 0 });
    // ShortLink.update()
})

router.get('/:shortURL', (req, res, next) => {
    const shortURL = req.params.shortURL;
    const shortURLData = linksDb.getValue(shortURL);
    if(!shortURLData) next('404');
    else{
        const longURL = shortURLData.longURL;
        linksDb.store(shortURL, { longURL, timesClicked: linksDb.getValue(shortURL).timesClicked + 1});
        res.redirect(longURL);
        // res.send();
    }
})

router.get('/', (req, res) => {
    // res.sendFile('index.html', '/views');
    res.sendFile(path.join(__dirname, '../../views/index.html'));
})

/**
 * 
 * @param {string} url - A url with or without 'https://' at the start
 * @returns {string} - A url with 'https://' at the start
 */
function httpsIncluded(url){
    const httpsStart = 'https://';
    const urlBeginning = url.slice(0, 8);
    return urlBeginning === httpsStart ? url : `${httpsStart}${url}`;
}

function findFreeKey(){
    let shortURLKey = nanoid(6);
    return ShortLink.findOne({ shortURL: shortURLKey })
    .then(shortLink => {
        return shortLink ? findFreeKey() : shortURLKey;
    })
    .catch(() => console.log('No data'));
}

module.exports = router;
// setRouterDB
