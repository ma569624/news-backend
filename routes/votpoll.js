const express = require('express');
const VotPollRouter = express.Router();
const { getvotpoll, postvotpoll, Editvotpoll, Deletevotpoll } = require('../controllers/votpoll');

VotPollRouter.route('/poll').get(getvotpoll);
VotPollRouter.route('/poll').post(postvotpoll);
VotPollRouter.route('/poll/:id').put(Editvotpoll);
VotPollRouter.route('/poll/:id').delete(Deletevotpoll);

module.exports = VotPollRouter;