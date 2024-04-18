const express = require('express');
const getyoutube = require('../controllers/youtube');
const YoutubeRouter = express.Router();


YoutubeRouter.route('/youtube').get(getyoutube);

module.exports = YoutubeRouter;