'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const basicAuth = require('./sign-in');
const Users = require('../auth/users-schema');

const router = express.Router();

// routes
router.post('/signup', signUp);
router.post('/signin', basicAuth, signIn);

// route handlers
async function signUp(req, res) {
  // Signup Route -- create a new user
  // Two ways to test this route with httpie
  // echo '{"username":"john","password":"foo"}' | http post :3000/signup
  // http post :3000/signup usernmae=john password=foo
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new Users(req.body);
    const record = await user.save();
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
}

async function signIn(req, res) {
  // Signin Route -- login with username and password
  // test with httpie
  // http post :3000/signin -a john:foo

  res.status(200).json(req.user);
}

module.exports = router;
