const express = require('express');
const { getRules } = require('../controllers/Rules.controllers');
const RulesRouter = express.Router();

RulesRouter.route('/rules').get(getRules);

module.exports = RulesRouter;