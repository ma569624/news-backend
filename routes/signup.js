const express = require('express');
// const { getSignup, postSignup, editSignup, deleteSignup } = require('../controllers/signup');
const postSign = require('../controllers/signup');
const upload = require('../middleware/uploader');
const signuprouter = express.Router();


signuprouter.route('/signup').get()
signuprouter.route('/signup').post(postSign)
signuprouter.route('/signup').put()
signuprouter.route('/signup').delete()

module.exports = signuprouter