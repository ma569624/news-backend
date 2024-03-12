const express = require('express');
const { getTeam, postTeam, EditTeam, DeleteTeam } = require('../controllers/Team');
const TeamRouter = express.Router();

const upload = require("../middleware/uploader");

TeamRouter.route('/team').get(getTeam);
TeamRouter.route('/team').post(upload, postTeam);
TeamRouter.route('/team/:id').put(upload, EditTeam);
TeamRouter.route('/team/:id').delete(DeleteTeam);

module.exports = TeamRouter;