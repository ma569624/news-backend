const express = require('express');
// const {getLogin, postLogin, editLogin, deleteLogin} = require('../controllers/login.controllers');
const {postlogin, getloginlogs} = require('../controllers/login.controllers');
const Loginrouter = express.Router();

Loginrouter.route('/login').get(getloginlogs)
Loginrouter.route('/login').post(postlogin)
Loginrouter.route('/login').delete()

module.exports = Loginrouter