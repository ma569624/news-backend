const express = require('express');
// const { getSignup, postSignup, editSignup, deleteSignup } = require('../controllers/signup');
const {postSign, getuser, deleteuser, edituser, forgetPassword} = require('../controllers/signup');
const upload = require('../middleware/uploader');
const signuprouter = express.Router();


signuprouter.route('/user').get(getuser)
signuprouter.route('/forget-password').get(forgetPassword)
signuprouter.route('/signup').post(upload, postSign)
signuprouter.route('/user/:id').put(upload, edituser)
signuprouter.route('/user/:id').delete(deleteuser)

module.exports = signuprouter