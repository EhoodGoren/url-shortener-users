// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const shortLinkRouter = require('./routers/shortLinkRouter');
const errorHandler = require('./middlewares/errorHandler')
const app = express();
// const { router: shortLinkRouter, setRouterDB } = require('./routers/shortLinkRouter');
// const db = require('./data/database');

// const linksDb = new db();
// setRouterDB(linksDb);
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.resolve(`${__dirname}/../public`)));
app.use('/views', express.static(path.resolve(`${__dirname}/../views`)));


app.use('/', shortLinkRouter);

app.use(errorHandler)

module.exports = app;
