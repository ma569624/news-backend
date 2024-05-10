const express = require('express');
const { getSubscribers, postSubscribers, editSubscribers, deleteSubscribers,getWebsiteHit } = require('../controllers/Subscribers');
const Subscribers = express.Router();

Subscribers.route('/hits').get(getWebsiteHit)
Subscribers.route('/Subscribers').get(getSubscribers)
Subscribers.route('/Subscribers').post(postSubscribers)
Subscribers.route('/Subscribers/:id').put(editSubscribers)
Subscribers.route('/Subscribers/:id').delete(deleteSubscribers)

module.exports = Subscribers