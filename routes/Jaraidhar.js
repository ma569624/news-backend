const express = require('express');
const JaraIdharroute = express.Router();

const upload = require("../middleware/uploader");
const { getJaraIdhar, postJaraIdhar, EditJaraIdhar, DeleteJaraIdhar } = require('../controllers/JaraIdhar');
// const { getbadikhabar, postbadikhabar, Editbadikhabar, Deletebadikhabar } = require('../controllers/badikhabare');

JaraIdharroute.route('/jaraidhar').get(getJaraIdhar);
JaraIdharroute.route('/jaraidhar').post(upload, postJaraIdhar);
JaraIdharroute.route('/jaraidhar/:id').put(upload, EditJaraIdhar);
JaraIdharroute.route('/jaraidhar/:id').delete(DeleteJaraIdhar);

module.exports = JaraIdharroute;