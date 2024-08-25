const express = require('express');
const { getTeam } = require('../controllers/Team.controllers');
const TeamRouter = express.Router();



TeamRouter.route('/team').get(getTeam);
module.exports = TeamRouter;