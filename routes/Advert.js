const express = require('express');
const AdvertRouter = express.Router();

const upload = require("../middleware/uploader");
const { getAdvert, postAdvert, EditAdvert, DeleteAdvert } = require('../controllers/Advert');

AdvertRouter.route('/advert').get(getAdvert);
AdvertRouter.route('/advert').post(upload, postAdvert);
AdvertRouter.route('/advert/:id').put(upload, EditAdvert);
AdvertRouter.route('/advert/:id').delete(DeleteAdvert);

module.exports = AdvertRouter;