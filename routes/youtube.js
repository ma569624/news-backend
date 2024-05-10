const express = require('express');
const {getyoutube, postyoutube} = require('../controllers/youtube');
const YoutubeRouter = express.Router();


YoutubeRouter.route('/youtube').get(getyoutube);
YoutubeRouter.route('/addyoutubevideo').get(postyoutube);

module.exports = YoutubeRouter;