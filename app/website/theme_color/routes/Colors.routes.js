const express = require('express');
const { getColors  } = require('../controllers/Colors.controllers');
const ColorsRouter = express.Router();

ColorsRouter.route('/colors').get(getColors);

module.exports = ColorsRouter;