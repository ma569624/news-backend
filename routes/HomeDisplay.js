const express = require('express');
const HomeDisplayRouter = express.Router();

const upload = require("../middleware/uploader");
const { getHomeDisplay, postHomeDisplay, DeleteHomeDisplay, EditHomeDisplay, MultiDeleteHomeDisplay, MultiEditHomeDisplay } = require('../controllers/HomeDisplay');

HomeDisplayRouter.route('/blogdisplay').get(getHomeDisplay);
HomeDisplayRouter.route('/blogdisplay').post(upload, postHomeDisplay);
HomeDisplayRouter.route('/blogdisplay/:id').put(upload, EditHomeDisplay);
HomeDisplayRouter.route('/blogdisplay/:id').delete(DeleteHomeDisplay);

HomeDisplayRouter.route('/blogdisplayall').delete(MultiDeleteHomeDisplay);
HomeDisplayRouter.route('/blogdisplayall').put(MultiEditHomeDisplay);

module.exports = HomeDisplayRouter;