'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const API_PATH_NAME = '/api';

var auth_routes = require('./routes/auth.routes');
app.use(API_PATH_NAME, auth_routes);

module.exports = app;
