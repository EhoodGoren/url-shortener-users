const express = require("express");
const cors = require("cors");
const path = require('path');
const shortLinkRouter = require('./routers/shortLinkRouter');
const errorHandler = require('./middlewares/errorHandler')
const registerRouter = require('./routers/registerRouter');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.resolve(`${__dirname}/../public`)));
app.use('/views', express.static(path.resolve(`${__dirname}/../views`)));

app.use('/register', registerRouter);
// app.use('/login', loginRouter);
app.use('/', shortLinkRouter);

app.use(errorHandler)

module.exports = app;
