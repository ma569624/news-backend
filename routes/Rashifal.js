const express = require('express');
const RashifalRouter = express.Router();
const JyotishRouter = express.Router();

const upload = require("../middleware/uploader");
const { getRashifal, postRashifal, EditRashifal, DeleteRashifal, getJyotish, postJyotish, EditJyotish, DeleteJyotish } = require('../controllers/Rashifal');

RashifalRouter.route('/rashifal').get(getRashifal);
RashifalRouter.route('/rashifal').post(upload, postRashifal);
RashifalRouter.route('/rashifal/:id').put(upload, EditRashifal);
RashifalRouter.route('/rashifal/:id').delete(DeleteRashifal);

RashifalRouter.route('/jyotish').get(getJyotish);
RashifalRouter.route('/jyotish').post(upload, postJyotish);
RashifalRouter.route('/jyotish/:id').put(upload, EditJyotish);
RashifalRouter.route('/jyotish/:id').delete(DeleteJyotish);

module.exports = {RashifalRouter, JyotishRouter};