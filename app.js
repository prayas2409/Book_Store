const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
require('./config/db.connection');
require('dotenv').config()
const bodyParser = require('body-parser');
const router = require('./main/routes/routes');
const cors = require('cors')
const app = express();

app.use(expressValidator());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors())
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

/**
 * @description :Global Exception
 */
app.use((error, req, res, next) => {
    let response = {
        success: false,
        status: 500,
        message: error.message,
    };
    res.json(response);
});

module.exports = app;
