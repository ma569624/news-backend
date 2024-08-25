const express = require('express');
const router = express.Router();

const Advert = require('../controllers/Advert.controllers');

router.get('/advert', Advert.getAdvert);

module.exports = router;