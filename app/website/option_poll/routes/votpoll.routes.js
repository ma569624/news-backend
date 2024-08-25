const express = require('express');
const VotPollRouter = express.Router();
const { getvotpoll} = require('../controllers/votpoll.controllers');

VotPollRouter.get('/poll', getvotpoll);

module.exports = VotPollRouter;