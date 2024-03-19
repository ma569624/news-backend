const express = require('express');
const { getRules, EditRules, postRules } = require('../controllers/Rules');
const RulesRouter = express.Router();

RulesRouter.route('/rules').get(getRules);
RulesRouter.route('/rules').post(postRules);
RulesRouter.route('/rules/:id').put(EditRules);

module.exports = RulesRouter;