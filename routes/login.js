const express = require('express');
// const {getLogin, postLogin, editLogin, deleteLogin} = require('../controllers/login');
const postlogin = require('../controllers/login');
const Loginrouter = express.Router();

Loginrouter.route('/login').get()
Loginrouter.route('/login').post(postlogin)
Loginrouter.route('/login').put()
Loginrouter.route('/login').delete()

module.exports = Loginrouter