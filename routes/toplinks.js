const express = require('express');
// const {getLogin, postLogin, editLogin, deleteLogin} = require('../controllers/login');
const postlogin = require('../controllers/login');
const { posttoplinks, gettoplinks, Edittoplinks, Deletetoplinks } = require('../controllers/toplinks');
const Toplinksrouter = express.Router();

Toplinksrouter.route('/toplinks').get(gettoplinks)
Toplinksrouter.route('/toplinks').post(posttoplinks)
Toplinksrouter.route('/toplinks/:id').put(Edittoplinks)
Toplinksrouter.route('/toplinks/:id').delete(Deletetoplinks)

module.exports = Toplinksrouter