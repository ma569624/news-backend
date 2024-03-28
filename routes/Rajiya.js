const express = require('express');
const RajiyoRouter = express.Router();

const upload = require("../middleware/uploader");
const { getRajiyo, postRajiyo, EditRajiyo, DeleteRajiyo } = require('../controllers/Rajiyo');

RajiyoRouter.route('/rajiya').get(getRajiyo);
RajiyoRouter.route('/rajiya').post(upload, postRajiyo);
RajiyoRouter.route('/rajiya/:id').put(upload, EditRajiyo);
RajiyoRouter.route('/rajiya/:id').delete(DeleteRajiyo);

module.exports = RajiyoRouter;