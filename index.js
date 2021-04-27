'use strict';

// 3rd party modules
const dotenv = require('dotenv');

// internal modules
const server = require('./src/server');

// configs
dotenv.config;
const port = process.env.PORT || 3333;

// app processes
server.start(port);