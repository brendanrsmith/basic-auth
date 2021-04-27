'use strict';

// 3rd Party Resources
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// routers
const authRoutes = require('../auth/routes');
const notFound = require('../src/error-handlers/404');
const internalError = require('../src/error-handlers/500');

// config dotenv
dotenv.config();

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// let anyone use this app with CORS
app.use(cors());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// use auth router
app.use(authRoutes);

// error handling
app.use('*', notFound);
app.use(internalError);

// export module to index.js
module.exports = {
  server: app,
  start: (port) => {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(port, () => console.log(`server up on port ${port}`));
      })
      .catch((e) => console.error('Could not start server', e.message));
  },
};
