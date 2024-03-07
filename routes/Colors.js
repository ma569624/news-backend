const express = require('express');
const { getColors, EditColors, postColors } = require('../controllers/colors');
const ColorsRouter = express.Router();

ColorsRouter.route('/colors').get(getColors);
ColorsRouter.route('/colors').post(postColors);
ColorsRouter.route('/colors/:id').put(EditColors);

module.exports = ColorsRouter;