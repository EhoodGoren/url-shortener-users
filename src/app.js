// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { router: shortLinkRouter, setRouterDB } = require('./routers/shortLinkRouter');
const errorHandler = require('./middlewares/errorHandler')
const db = require('./data/database');

const linksDb = new db();
setRouterDB(linksDb);

app.use(cors());
app.use(express.json());
app.use("/public", express.static(`./public`));

app.use('/', shortLinkRouter);

app.use(errorHandler)

module.exports = app;
