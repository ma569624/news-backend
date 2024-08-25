const express = require('express');
const { getWebsiteHit } = require('../controllers/Subscribers.controllers');
const Subscribers = express.Router();

Subscribers.route('/hits').get(getWebsiteHit)

module.exports = Subscribers