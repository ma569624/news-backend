const express = require('express');
const Founder = require('../controllers/Founder.controllers');
const FounderRouter = express.Router();

FounderRouter.get('/founder', Founder.getFounder)

module.exports = FounderRouter;